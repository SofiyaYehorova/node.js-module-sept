import {
  EActionTokenType,
  EEmailActions,
  ESmsActionEnum,
  EUserStatus,
} from "../enums";
import { ApiError } from "../errors";
import { Action, OldPassword, Token, User } from "../models";
import { emailService, smsService, tokenService } from "../services";
import { ICredentials, ITokenPair, ITokenPayload, IUser } from "../types";
import { passwordService } from "./index";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);
      await User.create({
        ...body,
        password: hashedPassword,
      });

      await Promise.all([
        await smsService.sendSms(body.phone, ESmsActionEnum.WELCOME),
        // await smsService.sendSms("+380933750918", ESmsActionEnum.WELCOME),
        // await emailService.sendMail(body.email);
        // await emailService.sendMail("sofiya-yehorova@ukr.net");!!!!!?????????
        await emailService.sendMail(
          "yehorova66@gmail.com",
          EEmailActions.WELCOME
        ),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );

      if (!isMatched) {
        throw new ApiError("Invalid email or password", 400);
      }

      const tokenPair = tokenService.generateTokenPair({
        _id: user._id,
        name: user.name,
      });

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    tokenInfo: ITokenPair,
    jwtPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });

      await Promise.all([
        Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
        Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = await User.findById(userId);

      const isMatched = await passwordService.compare(
        oldPassword,
        user.password
      );

      if (!isMatched) {
        throw new ApiError("Wrong old password", 400);
      }

      const hashedNewPassword = await passwordService.hash(newPassword);
      await User.updateOne({ _id: user._id }, { password: hashedNewPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionTokenType.forgot
      );
      await Action.create({
        actionToken,
        tokenType: EActionTokenType.forgot,
        _user_id: user._id,
      });

      await emailService.sendMail(user.email, EEmailActions.FORGOT_PASSWORD, {
        token: actionToken,
      });
      await OldPassword.create({ _user_id: user._id, password: user.password });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotPassword(
    password: string,
    id: string,
    token: string
  ): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(password);

      await User.updateOne({ _id: id }, { password: hashedPassword });
      await Action.deleteOne({
        actionToken: token,
        tokenType: EActionTokenType.forgot,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async sendActivateToken(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionTokenType.activate
      );
      await Action.create({
        actionToken,
        tokenType: EActionTokenType.activate,
        _user_id: user._id,
      });

      await emailService.sendMail(user.email, EEmailActions.ACTIVATE, {
        token: actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activate(userId: string): Promise<void> {
    try {
      await Promise.all([
        User.updateOne(
          { _id: userId },
          { $set: { status: EUserStatus.active } }
        ),
        Token.deleteMany({
          _user_id: userId,
          tokenType: EActionTokenType.activate,
        }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const authService = new AuthService();
