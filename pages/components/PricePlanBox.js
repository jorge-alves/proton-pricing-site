import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faArrowRight } from '@fortawesome/free-solid-svg-icons';

class PricePlanBox extends React.Component {

    constructor() {
        super();
    }

    render() {

        this.props.plan.MaxSpaceGB = this.props.plan.MaxSpace / 1073741824;
        if (this.props.plan.Currency == 'EUR') {
            this.props.plan.CurrencySymbol = '\u20AC';

        } else if (this.props.plan.Currency == 'USD') {
            this.props.plan.CurrencySymbol = '\u0024';
        } else if (this.props.plan.Currency == 'CHF') {
            this.props.plan.CurrencySymbol = 'Fr.';
        }

        let billedPerYearLabel = "Billed as " + this.props.plan.CurrencySymbol;
        let amountPerYear = 0;

        this.props.plan.Pricing[this.props.cycle] = this.props.plan.Pricing[this.props.cycle] / 100; // 100 -> 1 EUR CONVERT TAX

        if (this.props.cycle == 1) {
            amountPerYear = this.props.plan.Pricing[this.props.cycle] * 12;
        } else if (this.props.cycle == 12) {
            amountPerYear = this.props.plan.Pricing[this.props.cycle];
        } else if (this.props.cycle == 24) {
            amountPerYear = (this.props.plan.Pricing[this.props.cycle] / 24) * 12;
        }

        billedPerYearLabel += amountPerYear.toFixed(2) + " per year";

        return (
            <div className="card mb-4 shadow-sm">

                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">{this.props.plan.Title}</h4>
                </div>
                {true}
                <div className="card-body">

                    <h1 className="card-title pricing-card-title">
                        <span className="price-cycle-title"><span className="currency text-muted">{this.props.plan.CurrencySymbol}</span> <span className="price">{(this.props.plan.Pricing[this.props.cycle] / this.props.cycle).toFixed(2)}</span></span>
                        <small className="text-muted">/ mo</small>
                    </h1>

                    <div className="billed-per-year-lbl">{billedPerYearLabel}</div>

                    <ul className="list-unstyled mt-3 mb-4">
                        <li><FontAwesomeIcon icon={faArrowRight} />{this.props.plan.MaxMembers} user</li>
                        <li><FontAwesomeIcon icon={faArrowRight} />{this.props.plan.MaxSpaceGB} GB storage</li>
                        <li><FontAwesomeIcon icon={faArrowRight} />{this.props.plan.MaxAddresses} address{(this.props.plan.MaxAddresses <= 1) ? "" : "es"}</li>
                        <li><FontAwesomeIcon icon={faArrowRight} />{(this.props.plan.MaxDomains == 0) ? "No domain supported" : "Supports " + this.props.plan.MaxDomains + " domain"}{(this.props.plan.MaxDomains > 1) ? "es" : ""}</li>
                    </ul>
                    <button type="button" className="btn btn-lg btn-block btn-primary">Select</button>
                </div>
            </div>
        );
    }


}

export default PricePlanBox;