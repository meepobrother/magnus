import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinTable,
    Timestamp
} from 'typeorm';
import { System } from './system';
import { SystemEvent } from './systemEvent';
import { User } from './user';
const moment = require('moment');
@Entity()
export class ToDoItem {
	/**
	 * 编号
	 */
    @PrimaryGeneratedColumn()
    id?: number;

	/**
	 * 标题
	 */
    @Column()
    title: string;

	/**
	 * 简介
	 */
    @Column()
    desc: string;

	/**
	 * 创建时间
	 */
    @CreateDateColumn({
        type: 'timestamptz',
        transformer: {
            from: (date) => {
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            },
            to: (date) => {
                date = date ? date : new Date();
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    })
    createDate?: string;

    @Column({
        default: null
    })
    fromSystemId?: number;

    @Column({
        default: null
    })
    fromEventId?: number;

    @Column({
        default: null
    })
    fromUserId?: number;

    @Column({
        default: null
    })
    toUserId: number;
}
