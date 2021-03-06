import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import { connect } from 'react-redux';

class DashBoard extends Component {
  state = {
    active: 'unanswered'
  };

  toggle(tab) {
    if (this.state.active !== tab) {
      this.setState({
        active: tab
      });
    }
  }

  render() {
    const { unansweredQuestions, answeredQuestions } = this.props;
    const { active } = this.state;

    return (
      <div className="dashboard-content">
        <ul className="tabs">
          <li
            className={active === 'unanswered' ? 'active' : ''}
            onClick={() => {
              this.toggle('unanswered');
            }}
          >
            Unanswered
          </li>
          <li
            className={active === 'answered' ? 'active' : ''}
            onClick={() => {
              this.toggle('answered');
            }}
          >
            Answered
          </li>
        </ul>

        {active === 'unanswered' && (
          <ul className="questions unanswered">
            {unansweredQuestions.map(id => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        )}

        {active === 'answered' && (
          <ul className="questions answered">
            {answeredQuestions.map(id => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

DashBoard.propTypes = {
  answeredPolls: PropTypes.array,
  unansweredPolls: PropTypes.array
};

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  const answeredQuestions = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  return {
    unansweredQuestions: Object.keys(questions)
      .filter(id => !answeredQuestions.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions
  };
}

export default connect(mapStateToProps)(DashBoard);
