import ErrorHandler from "./error";

export function ValidationError(field: any, type: any, c: any) {
    return ErrorHandler.create("errors.com.epicgames.validation.validation_failed", `Validation Failed. '${field}' is not ${type}.`, [field], 1040, undefined, 400, c);
}