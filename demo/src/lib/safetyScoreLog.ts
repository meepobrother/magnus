import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	Column,
	ManyToOne,
	OneToOne
} from 'typeorm';
import { SafetyScoreRule } from './safetyScoreRule';
import { User } from './user';
import { UserLoginLog } from './userLogin';
/**
 * 用户安全分扣除记录
 */
@Entity()
export class SafetyScoreLog {
	/**
	 * 编号
	 */
	@PrimaryGeneratedColumn()
	id?: number;

	/**
	 * 扣除分数
	 */
	@Column()
	score: number;


	/**
	 * 时间
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
