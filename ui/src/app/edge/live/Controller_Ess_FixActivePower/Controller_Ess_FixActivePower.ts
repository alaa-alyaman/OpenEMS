import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChannelAddress, CurrentData, Utils } from 'src/app/shared/shared';
import { AbstractFlatWidget } from '../Generic Components/flat/abstract-flat-widget';
import { Controller_Ess_FixActivePowerModalComponent } from './modal/modal.component';

@Component({
  selector: 'Controller_Ess_FixActivePower',
  templateUrl: './Controller_Ess_FixActivePower.html'
})
export class Controller_Ess_FixActivePower extends AbstractFlatWidget {

  private static PROPERTY_POWER: string = "_PropertyPower";

  public chargeState: BehaviorSubject<string> = new BehaviorSubject('');
  public chargeStateValue: BehaviorSubject<number> = new BehaviorSubject(0);

  public readonly CONVERT_WATT_TO_KILOWATT = Utils.CONVERT_WATT_TO_KILOWATT

  public stateConverter = (value: any): string => {
    if (value === 'MANUAL_ON') {
      return this.translate.instant('General.on');
    } else if (value === 'MANUAL_OFF') {
      return this.translate.instant('General.off');
    } else {
      return '-';
    }
  }

  protected getChannelAddresses(): ChannelAddress[] {
    let channelAddresses: ChannelAddress[] = [new ChannelAddress(this.componentId, Controller_Ess_FixActivePower.PROPERTY_POWER)]
    return channelAddresses;
  }

  protected onCurrentData(currentData: CurrentData) {
    let channelPower = currentData.thisComponent['_PropertyPower'];
    if (channelPower >= 0) {
      this.chargeState.next('General.dischargePower');
      this.chargeStateValue.next(channelPower)
    } else {
      this.chargeState.next('General.chargePower');
      this.chargeStateValue.next(channelPower * -1);
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: Controller_Ess_FixActivePowerModalComponent,
      componentProps: {
        component: this.component,
        chargeState: this.chargeState,
        chargeStateValue: this.chargeStateValue,
        stateConverter: this.stateConverter,
      }
    });

    return await modal.present();
  }

}

