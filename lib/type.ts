export type StartupTypeCard = {
	_id: number;
	title: string;
	description: string;
	category: string;
	image: string;
	createdAt: string;
	views: number;
	author: {
		_id: number;
		name: string;
		image: string;
	};
};
