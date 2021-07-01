import { HttpException, HttpStatus } from "@nestjs/common";

export const handleHttpException = (err) => {
    if (err && err.status) {
        throw new HttpException(err.response, err.status);
    } else {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
};