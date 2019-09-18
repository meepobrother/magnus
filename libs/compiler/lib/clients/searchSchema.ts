import { SFSchema } from '@delon/form';

interface CreateSearchSchema {
    type?: string;
}
/**
 * 搜索 schema
 */
export class SearchSchema {
    /**
     * 创建schema
     */
    create(): CreateSearchSchema {
        return {};
    }
}
