import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  TYPEORM_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  TYPEORM_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  TYPEORM_DATABASE: string;

  @IsNotEmpty()
  @IsNumber()
  TYPEORM_PORT: number;

  @IsNotEmpty()
  @IsString()
  TYPEORM_HOST: string;

  @IsNotEmpty()
  @IsBoolean()
  TYPEORM_LOGGING: boolean;

  // @IsNotEmpty()
  // @IsBoolean()
  // TYPEORM_SYNCHRONIZATION: boolean;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
