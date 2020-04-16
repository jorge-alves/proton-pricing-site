import fetch from 'isomorphic-unfetch';
import PricePlanBox from './PricePlanBox';

class PricingPlans extends React.Component {

    constructor() {
        super();
        this.state = {
            currency: 'EUR',
            billingCycle: 24,
            plans: []
        };
        this.requestPlans();
        this.onChangeBillingCycle = this.onChangeBillingCycle.bind(this);
        this.onChangeCurrency = this.onChangeCurrency.bind(this);
    }

    async requestPlans() {

        const myInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'x-pm-appversion': 'Other',
                'x-pm-apiversion': '3',
                'Accept': 'application/vnd.protonmail.v1+json',
            },
            mode: 'cors',
            cache: 'default'
        };

        let url = `https://api.protonmail.ch/payments/plans?Currency=${this.state.currency}&Cycle=${this.state.billingCycle}`;
        const response = await fetch(url, myInit);
        const plans = await response.json();
        if (plans["Plans"] != undefined) {

            // filter plans user > 0 
            let plansFiltered = [];
            for (let i = 0; i < plans["Plans"].length; i++) {
                if (plans["Plans"][i].MaxMembers != 0) {
                    plansFiltered.push(plans["Plans"][i]);
                }
            }

            // Sort list
            plansFiltered.sort((a, b) => (a.MaxMembers > b.MaxMembers) ? 1 : (a.MaxMembers === b.MaxMembers) ? ((a.MaxAddresses > b.MaxAddresses) ? 1 : -1) : -1)

            this.setState({ plans: plansFiltered });
        }
    }

    onChangeBillingCycle(e) {
        this.setState(
            { billingCycle: e.target.value },
            function () {
                this.requestPlans(); // refresh plans with according to currency
            }
        );

    }

    onChangeCurrency(e) {
        this.setState({ currency: e.target.value },
            function () {
                this.requestPlans(); // refresh plans with according to currency                    
            }
        );

    }

    render() {


        let pricesContainers = [];

        if (this.state.plans != undefined && this.state.plans.length > 0) {

            if (this.state.plans !== undefined) {
                let counter = 0;
                let pricesLines = [];
                let lineNr = 0;
                for (let i = 0; i < this.state.plans.length; i++) {

                    //load tag price box
                    pricesLines.push(<PricePlanBox key={i} plan={this.state.plans[i]} currency={this.state.currency} cycle={this.state.billingCycle} />);

                    if (counter == 3 || i == (this.state.plans.length - 1)) {
                        // closing container
                        counter = 0;
                        pricesContainers.push(<div key={"cardPrice" + lineNr} id={"cardPrice" + lineNr} className="card-deck mbs-4 text-center">{pricesLines}</div>);
                        pricesLines = [];
                        lineNr++;
                    } else {
                        counter++;
                    }

                }
            }
        }

        let htmlForm = (
            <div>
                <form className="form-inline float-right" >

                    <div className="form-group">
                        <select className="form-control" name="billing_cycle_month" value={this.state.billingCycle} onChange={this.onChangeBillingCycle}>
                            <option value="1">Monthly</option>
                            <option value="12">Annualy</option>
                            <option value="24">2 years</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <select className="form-control" name="currency" value={this.state.currency} onChange={this.onChangeCurrency}>
                            <option value="EUR">EUR</option>
                            <option value="CHF">CHF</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                </form>

                <div className="clearfix"></div>
                <br />

                <div id="priceListContainer">
                    {pricesContainers}
                </div>

            </div>
        );

        return htmlForm;
    }
}

export default PricingPlans;