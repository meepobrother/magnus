<p align="center">
    <img style="margin: 0 auto;" width="220px" src="./logo.jpg"/>
</p>

### 功能特点

- 根据 Typescript 自动生成`.graphql`和`.proto`配置文件（灵活）
- 生成自动支持按条件搜索、分页、排序的增删改查
- 自动更新数据库结构
- 支持微服务架构

## install

```
npm install -g @notadd/magnus
```

## add magnus.json
```json
{
  "inputs": [// 输入
    "demo/src/**/*.ts"
  ],
  "output": "demo/config",// 输出
  "assets": "demo/assets",// 静态资源
  "debug": false,// 调试
  "name": "demo"// 名称
}
```

## run magnus

```ts
magnus --watch 监听文件变化
magnus 单次运行
```

### 生成单个接口
```ts
@Magnus()
export class Controller2 extends MagnusBase<User> {
    tablename: string = 'User';
    /**
     * 覆盖Controller中的getUser，单独处理
     **/
    @Query()
    getUser(): User {
        return {
            id: 1,
        };
    }
}
```
### 批量生成通用接口

```ts
import { Magnus, MagnusBase, Mutation, Query, Where, Order } from '@notadd/magnus-core';
import { getRepository, SelectQueryBuilder, FindOperator, FindConditions } from 'typeorm';
import {
    Department,
    Role,
    RoleGroup,
    SafetyScoreLog,
    SafetyScoreRule,
    Station,
    System,
    SystemEvent,
    SystemRight,
    ToDoItem,
    User,
    UserLoginLog
} from '../entities';
import { PageLimit } from './types';
@Magnus({
    entities: [
        User,
        System,
        SystemEvent,
        SystemRight,
        Department,
        Role,
        Station,
        ToDoItem,
        RoleGroup,
        UserLoginLog,
        SafetyScoreLog,
        SafetyScoreRule
    ]
})
export class Controller<T> extends MagnusBase<T> {
    get repository() {
        return getRepository<T>(this.entity);
    }
	/**
	 * 没有就插入，有就更新
	 * @param entity  要保存的数据
	 */
    @Mutation()
    async save(entity: T): Promise<T> {
        const item = this.repository.create(entity);
        return await this.repository.save(item);
    }

	/**
	 * 插入数据
	 * @param entity 要插入的数据
	 */
    @Mutation()
    async insert(entity: T): Promise<T> {
        const item = this.repository.create(entity);
        const res = await this.repository.insert(item);
        return item;
    }
	/**
	 * 通过指定条件获取一条数据
	 * @param entity 条件
	 */
    @Query()
    async get(entity: Where<T>): Promise<T | undefined> {
        const selectAndRelations = this.createSelectAndRelations();
        const res = await this.repository.findOne({
            where: entity,
            select: selectAndRelations.select,
            relations: selectAndRelations.relations
        });
        return res;
    }

    /**
     * 通过制定条件获取一组数据
     * @param entity 条件
     */
    @Query()
    async find(entity: Where<T>, order: Order<T>, limit: PageLimit = {
        page: 1,
        psize: 20
    }): Promise<T[]> {
        const selectAndRelations = this.createSelectAndRelations();
        const where = createWhere(entity);
        const res = await this.repository.find({
            select: selectAndRelations.select,
            where,
            relations: selectAndRelations.relations,
            skip: (limit.page - 1) * limit.psize,
            take: limit.psize,
            order: order
        });
        return res;
    }

    /**
     * 删除
     * @param id 根据id删除
     */
    @Query()
    async delete(id: number): Promise<boolean> {
        const res = await this.repository.delete(id);
        if (res) return true;
        return false;
    }

}
```
