import { DocumentNode } from 'graphql';
import { HandlerDefMap, InjectMap, ClassDef } from '@notadd/magnus-core';
export declare function bootstrap(map: HandlerDefMap, context: DocumentNode, injectDef: InjectMap, entityDef: ClassDef, entities: InjectMap, port: number): void;
