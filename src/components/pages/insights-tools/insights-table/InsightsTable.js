import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import GroupedInsights from './grouped-insights/GroupedInsightsContainer';
import UngroupedInsights from './ungrouped-insights/UngroupedInsightsContainer';
import { format } from 'date-fns';
import { getBEMClasses } from 'helper/BEMHelper';
import { categoriesType } from '../../../../propTypes/categoryType';
import { insightsType } from '../../../../propTypes/insightType';

import 'assets/styles/components/data-table.css';

const dataTable = 'data-table';
const formName = 'insights';
const bemClasses = getBEMClasses([dataTable]);

class InsightsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    tags: PropTypes.object.isRequired,
    categories: categoriesType,
    insights: insightsType.isRequired,
    formValues: PropTypes.array,
    getInsights: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getTags();
    this.props.getCategories();
    this.props.getInsights(format(this.props.selectedDate, 'YYYY-MM-DD'));
    this.props.initialize(this.props.initialValues);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.insights.length && nextProps.insights.length) {
      this.props.initialize(nextProps.initialValues);
    }
  }

  renderTableContent() {
    const { formValues } = this.props;

    if (!formValues) {
      return null;
    }

    if (!this.props.isGrouped) {
      return this.renderForm(UngroupedInsights);
    } else {
      return this.renderForm(GroupedInsights);
    }
  }

  renderForm(component) {
    return <FieldArray name={formName} component={component} />;
  }

  render() {
    const { insights } = this.props;

    return (
      <div className={bemClasses()}>
        <form>
          <table className={bemClasses('content')}>
            <tbody>{insights && this.renderTableContent()}</tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default InsightsTable;
