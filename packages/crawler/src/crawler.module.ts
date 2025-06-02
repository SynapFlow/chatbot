import { Module } from '@nestjs/common';
import { WebCrawler } from './crawler';

@Module({
  providers: [WebCrawler],
  exports: [WebCrawler],
})
export class CrawlerModule {}