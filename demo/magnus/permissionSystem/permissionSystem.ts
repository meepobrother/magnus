import { Transport } from '@nestjs/microservices';
import { join } from 'path';
export const permissionSystemOptions: any = {
    transport: Transport.GRPC,
    options: {
        url: `${process.env.PERMISSION_SYSTEM_SRV_HOST || '0.0.0.0'}:${process.env.PERMISSION_SYSTEM_SRV_PORT||'9001'}`,
        package: 'permissionSystem',
        protoPath: join(__dirname, '../../assets/permissionSystem/magnus.proto'),
    },
    name: "permissionSystem"
};
