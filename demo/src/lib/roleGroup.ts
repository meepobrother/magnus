import { Entity, PrimaryGeneratedColumn, OneToMany, Column, ManyToMany } from 'typeorm';
import { Role } from './role';
import { Station } from './station';
import { ResolveProperty } from '@notadd/magnus-core';
@Entity()
export class RoleGroup {
    @PrimaryGeneratedColumn()
    id?: number;

	/**
	 * 角色组名
	 */
    @Column()
    title: string;

	/**
	 * 角色组简介
	 */
    @Column()
    desc?: string;
}
