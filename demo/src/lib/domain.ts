import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';
/**
 * 域
 */
@Entity()
export class Domain {
    @PrimaryGeneratedColumn()
    id: number;

	/**
	 * 域标题
	 */
    @Column()
    title: string;

	/**
	 * 域编号
	 */
    @Column()
    code: string;

	/**
	 * 域状态
	 */
    @Column({
        default: 0
    })
    status?: number;

	/**
	 * 创建人
	 */
    @Column({
        default: 0
    })
    createUser?: number;

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
}
