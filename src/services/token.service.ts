import * as jwt from "jsonwebtoken";

import { configs } from "../configs";
import { EActionTokenType, ETokenType } from "../enums";
import { ApiError } from "../errors";
import { IActionTokenPayload, ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, configs.REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public generateActionToken(
    payload: IActionTokenPayload,
    tokenType: EActionTokenType
  ): string {
    let secret = "";

    switch (tokenType) {
      case EActionTokenType.activate:
        secret = configs.JWT_ACTIVATE_SECRET;
        break;
      case EActionTokenType.forgot:
        secret = configs.JWT_FORGOT_SECRET;
        break;
    }

    return jwt.sign(payload, secret, { expiresIn: "7d" });
  }

  public checkToken(
    token: string,
    tokenType = ETokenType.access
  ): ITokenPayload {
    try {
      let secret = "";

      switch (tokenType) {
        case ETokenType.access:
          secret = configs.ACCESS_SECRET;
          break;
        case ETokenType.refresh:
          secret = configs.REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token is not valid", 401);
    }
  }
  public checkActionToken(token: string, tokenType: EActionTokenType): string {
    try {
      let secret = "";
      switch (tokenType) {
        case EActionTokenType.forgot:
          secret = configs.JWT_FORGOT_SECRET;
          break;
        case EActionTokenType.activate:
          secret = configs.JWT_ACTIVATE_SECRET;
          break;
      }

      return jwt.sign(token, secret) as EActionTokenType;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
