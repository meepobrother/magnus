import { Transport } from '@nestjs/microservices';
import { join } from 'path';
export const systemSettingOptions: any = {
    transport: Transport.GRPC,
    options: {
        url: `${process.env.SYSTEM_SETTING_SRV_HOST || '0.0.0.0'}:${process.env.SYSTEM_SETTING_SRV_PORT||'9001'}`,
        package: 'systemSetting',
        protoPath: join(__dirname, '../../assets/systemSetting/magnus.proto'),
    },
    name: "systemSetting"
};
