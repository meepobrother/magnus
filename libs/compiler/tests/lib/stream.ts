import { GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { Controller } from '@nestjs/common';
interface GetStreamResult {
    title: string;
}
interface GetStreamInput {
    title: string;
}

@Controller()
export class StreamController {
    @GrpcStreamMethod()
    getStream(input: GetStreamInput): Observable<GetStreamResult> {
        return of({ title: `` })
    }
}