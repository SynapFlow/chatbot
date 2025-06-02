import { Module } from '@nestjs/common';
import { IntelligentChunker } from './chunker';

@Module({
  providers: [IntelligentChunker],
  exports: [IntelligentChunker],
})
export class ChunkerModule {}