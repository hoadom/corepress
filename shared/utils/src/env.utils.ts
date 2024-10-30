export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];

  if (value === undefined || value === null) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(
      `Environment variable ${key} is not set and no default value was provided.`
    );
  }

  return value;
}

export function getEnvAsBoolean(key: string, defaultValue?: boolean): boolean {
  const value = process.env[key];

  if (value === undefined || value === null) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(
      `Environment variable ${key} is not set and no default value was provided.`
    );
  }

  const normalizedValue = value.toLowerCase();
  if (normalizedValue === "true") {
    return true;
  } else if (normalizedValue === "false") {
    return false;
  } else {
    throw new Error(
      `Environment variable ${key} is not a valid boolean (expected 'true' or 'false').`
    );
  }
}

export function getEnvAsNumber(key: string, defaultValue?: number): number {
  const value = process.env[key];

  if (value === undefined || value === null) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(
      `Environment variable ${key} is not set and no default value was provided.`
    );
  }

  const parsedValue = Number(value);
  if (isNaN(parsedValue)) {
    throw new Error(`Environment variable ${key} is not a valid number.`);
  }

  return parsedValue;
}
