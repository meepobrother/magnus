import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';
/**
 * 部门表
 */
@Entity()
export class Department {
	/**
	 * 部门编号
	 */
    @PrimaryGeneratedColumn({
        comment: '部门编号'
    })
    id?: number;

	/**
	 * 部门名称
	 */
    @Column({
        comment: '部门名称'
    })
    title?: string;

	/**
	 * 部门状态
	 */
    @Column({
        comment: '部门状态',
        default: 0
    })
    status?: number;

	/**
	 * 是否显示
	 */
    @Column({
        comment: '是否显示',
        default: true
    })
    shown?: boolean;

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
    createDate: number;
    domainId: number;
}
