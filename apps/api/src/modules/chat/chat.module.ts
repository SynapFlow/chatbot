import { Module } from '@nestjs/common';
// import { ChatModule as ChatServiceModule } from '@chatbot-rag/chat';
import { AuthModule } from '../auth/auth.module';
import { ChatController } from './chat.controller';

@Module({
  imports: [AuthModule], // TODO: Add ChatServiceModule when package is built
  controllers: [ChatController],
  exports: [],
})
export class ChatModule {}