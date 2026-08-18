// Beast-System-3-Web/src/full-governance-portal.ts

import { BeastOperatorHUD } from "./operator-hud";
import { BeastWebControlPanel } from "./web-control-panel";
import { BeastUiFramework, UiLayout, UiCard } from "./frontend-ui-framework";

export class BeastFullGovernancePortal {
  private ui: BeastUiFramework;
  private hud: BeastOperatorHUD;
  private panel: BeastWebControlPanel;

  constructor(apiUrl: string) {
    this.ui = new BeastUiFramework();
    this.hud = new BeastOperatorHUD();
    this.panel = new BeastWebControlPanel(apiUrl);
  }

  public async render(identityId: string): Promise<string> {
    const cycleView = await this.panel.renderCycle(identityId);
    const dashboardView = await this.panel.renderDashboard();

    const layout = new UiLayout("portal-layout", [
      new UiCard("hud-card", "Operator HUD", this.hud.renderHUD()),
      new UiCard("cycle-card", cycleView.title, cycleView.html),
      new UiCard("dashboard-card", dashboardView.title, dashboardView.html)
    ]);

    this.ui.register(layout);
    return this.ui.render("portal-layout");
  }

  public summarize(): string {
    return "Full Governance Portal: HUD + Dashboard + Cycle View integrated";
  }
}

export function createBeastFullGovernancePortal(
  apiUrl: string
): BeastFullGovernancePortal {
  return new BeastFullGovernancePortal(apiUrl);
}
