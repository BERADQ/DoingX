declare type Repeat = "day"|"year"|""
declare class backLog {
	logUUID:string;
	logName: string;
	logStarTime:Date;
	logOverTime:Date;
	logBindDoingUUID:string;
	logRepeat:Repeat;
}