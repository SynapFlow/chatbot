import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { prisma, Source, SourceTypeEnum } from '@chatbot-rag/database';

interface WebsiteSourceConfig {
  name?: string;
  url: string;
  crawlDepth?: number;
  maxPages?: number;
  includePatterns?: string[];
  excludePatterns?: string[];
}

@Injectable()
export class SourcesService {
  constructor(@InjectQueue('crawling') private crawlingQueue: Queue) {}

  async createWebsiteSource(projectId: string, config: WebsiteSourceConfig): Promise<Source> {
    const source = await prisma.source.create({
      data: {
        projectId,
        type: SourceTypeEnum.WEBSITE,
        name: config.name || new URL(config.url).hostname,
        config: {
          url: config.url,
          crawlDepth: config.crawlDepth || 3,
          maxPages: config.maxPages || 100,
          includePatterns: config.includePatterns || [],
          excludePatterns: config.excludePatterns || [],
        },
        metadata: {},
      },
    });

    // Queue crawling job
    await this.crawlingQueue.add('crawl-website', {
      sourceId: source.id,
      projectId,
      config: source.config,
    });

    return source;
  }

  async syncSource(sourceId: string): Promise<void> {
    const source = await prisma.source.findUnique({
      where: { id: sourceId },
    });

    if (!source) {
      throw new Error('Source not found');
    }

    switch (source.type) {
      case SourceTypeEnum.WEBSITE:
        await this.crawlingQueue.add('crawl-website', {
          sourceId: source.id,
          projectId: source.projectId,
          config: source.config,
        });
        break;
      case SourceTypeEnum.DOCUMENT:
        // Handle document sync
        break;
      case SourceTypeEnum.INTEGRATION:
        // Handle integration sync
        break;
    }
  }
}