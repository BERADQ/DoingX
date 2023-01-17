declare type HRepeat = "none" | "day" | "week" | "month" | "year"

export class BackLog {
	logUUID: string = crypto.randomUUID();
	logName: string = "新建待办";
	logStarTime: number = (new Date()).getTime();
	logBindDoingUUID: string | null = null;
	logRepeat: HRepeat = "none";
	isCompleted: boolean = false;
	inheritUUID: string | null = null;
	
	setCompleted(): BackLog | null {
		this.isCompleted = !this.isCompleted;
		let temp: BackLog | null = null;
		if (this.logRepeat !== "none") {
			temp = new BackLog();
			temp.logRepeat = this.logRepeat;
			temp.logName = this.logName;
			temp.isCompleted = false;
			temp.logUUID = this.logUUID;
			temp.logBindDoingUUID = this.logBindDoingUUID;
			this.logUUID = crypto.randomUUID();
			this.inheritUUID = temp.logUUID;
			let starDate: Date;
			switch (this.logRepeat) {
				case "day":
					temp.logStarTime = this.logStarTime + 86400000;
					break;
				case "week":
					temp.logStarTime = this.logStarTime + 604800000;
					break;
				case "month":
					starDate = new Date(this.logStarTime);
					starDate.setMonth(starDate.getMonth() + 1);
					temp.logStarTime = starDate.getTime();
					break;
				case "year":
					starDate = new Date(this.logStarTime);
					starDate.setFullYear(starDate.getFullYear() + 1);
					temp.logStarTime = starDate.getTime();
					break;
			}
		}
		this.logRepeat = "none";
		//console.log(temp, this);
		return temp;
	}
	
	unitBacktracking() {
		let starDate: Date;
		switch (this.logRepeat) {
			case "day":
				this.logStarTime -= 86400000;
				break;
			case "week":
				this.logStarTime -= 604800000;
				break;
			case "month":
				starDate = new Date(this.logStarTime);
				starDate.setMonth(starDate.getMonth() - 1);
				this.logStarTime = starDate.getTime();
				break;
			case "year":
				starDate = new Date(this.logStarTime);
				starDate.setFullYear(starDate.getFullYear() - 1);
				this.logStarTime = starDate.getTime();
				break;
		}
	}
	
	static from(obj: {
		logUUID?: string,
		logName?: string,
		logStarTime?: number,
		logBindDoingUUID?: string | null,
		logRepeat?: HRepeat,
		isCompleted?: boolean
	}): BackLog {
		let temp = new BackLog();
		temp.logUUID = obj.logUUID ?? crypto.randomUUID();
		temp.logName = obj.logName ?? "新建待办";
		temp.logStarTime = obj.logStarTime ?? (new Date()).getTime();
		temp.logBindDoingUUID = obj.logBindDoingUUID ?? null;
		temp.logRepeat = obj.logRepeat ?? "none";
		temp.isCompleted = obj.isCompleted ?? false;
		return temp;
	}
}

export class FocusM {
	positiveTiming: boolean;
	
	lengthOfASingleWork: number;
	lengthOfRest: number;
	numberOfCycles: number;
	color: string;
	name: string;
	id: string = crypto.randomUUID();
	
	static from(obj: {
		positiveTiming?: boolean,
		lengthOfASingleWork?: number,
		lengthOfRest?: number,
		numberOfCycles?: number,
		color?: string,
		name?: string,
		id?: string,
	}): FocusM {
		let temp: FocusM = new FocusM();
		
		temp.positiveTiming = obj.positiveTiming ?? false;
		temp.lengthOfASingleWork = obj.lengthOfASingleWork ?? 40;
		temp.lengthOfRest = obj.lengthOfRest ?? 10;
		temp.numberOfCycles = obj.numberOfCycles ?? 2;
		temp.color = obj.color ?? "#03A9F4";
		temp.name = obj.name ?? "";
		temp.id = obj.id ?? crypto.randomUUID();
		
		return temp;
	}
	
}