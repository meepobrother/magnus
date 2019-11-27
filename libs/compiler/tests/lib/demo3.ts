import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices';
import { Magnus } from '@nger/magnus-core';
@Controller()
@Magnus()
export class Demo3 {
    @GrpcMethod()
    add(a: number, b: number): number {
        return a + b;
    }
}