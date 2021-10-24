import { CallGateway } from './../gateways/call.gateway';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [CallGateway],
})
export class CallModule {}
