import { Module } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [EventsGateway],
  exports:[EventsGateway],

})
export class EventsModule {}