import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
/**
 * 角色表
 */
@Entity()
export class Role {
	/**
	 * 序号
	 */
    @PrimaryGeneratedColumn()
    id?: number;

	/**
	 * 角色标识
	 */
    @Column()
    code: string;

	/**
	 * 角色名称
	 */
    @Column()
    title: string;

	/**
	 * 角色描述
	 */
    @Column({
        default: ``
    })
    desc?: string;


	/**
	 * 创建时间
	 */
    @CreateDateColumn({
        type: 'timestamptz',
        transformer: {
            to: (value: number) => {
                let date = new Date();
                if (value) {
                    date = new Date(value);
                }
                return date;
            },
            from: (value: string) => {
                return new Date(value).getTime();
            }
        }
    })
    createDate?: number;

	/**
	 * 更新时间
	 */
    @UpdateDateColumn({
        type: 'timestamptz',
        transformer: {
            to: (value: number) => {
                let date = new Date();
                if (value) {
                    date = new Date(value);
                }
                return date;
            },
            from: (value: string) => {
                return new Date(value).getTime();
            }
        }
    })
    updateDate?: number;
}
