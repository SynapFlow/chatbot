import { Module } from '@nestjs/common';
import { ParserFactory } from './parser-factory';

@Module({
  providers: [ParserFactory],
  exports: [ParserFactory],
})
export class ParserModule {}