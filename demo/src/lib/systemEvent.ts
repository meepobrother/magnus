import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ToDoItem } from './toDoItem';
import { System } from './system';
import { ResolveProperty } from '@notadd/magnus-core';
/**
 * 模块事件类型
 */
@Entity()
export class SystemEvent {
    @PrimaryGeneratedColumn()
    id?: number;
	/**
	 * 权限名
	 */
    @Column()
    title: string;
}
