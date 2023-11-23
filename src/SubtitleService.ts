import HtmlManagerAbstract from "./HtmlManagers/Abstract/HtmlManagerAbstract";
import VisibilityService from "./VisibilityService";
import HistoryService from "./HistoryService";

export default class SubtitleService {

	htmlManager: HtmlManagerAbstract;
	visibilityService: VisibilityService;

	constructor(htmlManager: HtmlManagerAbstract) {
		this.htmlManager = htmlManager;
		this.htmlManager.beforeInit();
		this.visibilityService = new VisibilityService(this.htmlManager);

		// history
		new HistoryService(this.htmlManager);
	}

	toggleSub(): void {
		this.visibilityService.toggleSub();
	}

	toggleSubHistory(): void {
		this.visibilityService.toggleSubHistory();
	}
}
