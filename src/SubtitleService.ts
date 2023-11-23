import HtmlManagerAbstract from "./HtmlManagers/Abstract/HtmlManagerAbstract";
import VisibilityService from "./VisibilityService";
import TranslatorService from "./TranslatorService";
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

		// translator
		const translatorService = new TranslatorService(this.htmlManager, this.visibilityService);
		translatorService.runTranslator(this.htmlManager.getSubHistoryBlock());
	}

	toggleSub(): void {
		this.visibilityService.toggleSub();
	}

	toggleSubHistory(): void {
		this.visibilityService.toggleSubHistory();
	}
}
