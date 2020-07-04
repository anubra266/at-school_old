import React, {Component} from 'react';
import './Timer.scss'; //Have your own styling
import { Row, Col } from 'reactstrap';

export class Timer extends Component {
  constructor(props){
    super(props);
    this.state = {
      remainingMinutes: 0,
      remainingSeconds: 0
    };
  }

  updateRemainMinutesAndSeconds(timeRemainingInSeconds){
    let remainingMinutes = Math.floor(timeRemainingInSeconds/60);
    let remainingSeconds = timeRemainingInSeconds % 60;
    this.setState({
      remainingMinutes,
      remainingSeconds
    });
  }

  countDown(timeRemainingInSeconds,shouldSkipCallback){
    this.setState({
      timeRemainingInSeconds
    });
    if (!shouldSkipCallback && timeRemainingInSeconds % 60 === 0) {
      this.props.onEveryMinute(1);
    }
    if (timeRemainingInSeconds === 0){
      this.props.onCompletion();
    }
    localStorage.setItem('timeRemainingInSeconds',timeRemainingInSeconds);
    if(timeRemainingInSeconds > 0){
      this.updateRemainMinutesAndSeconds(timeRemainingInSeconds);
      timeRemainingInSeconds = timeRemainingInSeconds-1;
      this.setTimeoutId = setTimeout(this.countDown.bind(this,timeRemainingInSeconds, false), 1000);
    }
  }

  compareServerTimeAndComponentTimeAndUpdateServer(serverSideTimeRemainingInSeconds){
    let componentTimeRemainingInSeconds = localStorage.getItem('timeRemainingInSeconds');
    if(componentTimeRemainingInSeconds && componentTimeRemainingInSeconds < serverSideTimeRemainingInSeconds) {
      let differenceInMinutes = Math.floor((serverSideTimeRemainingInSeconds - componentTimeRemainingInSeconds)/60)
      if(differenceInMinutes>0){
        this.props.onEveryMinute(differenceInMinutes)
      }
      return componentTimeRemainingInSeconds;
    }
    return serverSideTimeRemainingInSeconds;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.timeRemainingInSeconds !== nextProps.timeRemainingInSeconds){
      let timeRemainingInSeconds = this.compareServerTimeAndComponentTimeAndUpdateServer(nextProps.timeRemainingInSeconds);
      this.countDown(timeRemainingInSeconds,true);
    }
  }

  componentWillUnmount(){
    clearTimeout(this.setTimeoutId);
  }

  render(){
    return (
      <div className='timer'>
          <div>
          <Row>
            <Col>
          <div className='font-weight-bold lead number-display'>
            {
              this.state.remainingMinutes>9?
              this.state.remainingMinutes:'0'+this.state.remainingMinutes
            }:{
              this.state.remainingSeconds>9?
              this.state.remainingSeconds:'0'+this.state.remainingSeconds
            }
          </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='info'>remaining</div>
            </Col>
          </Row>
          </div>

      </div>
    )
  }
}




CBT taBLE
questions:
id,body

answers:
id,question_id,body,is_correct


Assuming you have a form submitted with something like 'answer_id' for the one they picked then you can just do :

public function checkAnswer(Request $request)
{
  $answer = Answer::find($request->answer_id);
  if (! $answer->is_correct) {
    return 'Wrong answer';
  }
  return 'Correct!';
}
Or if it made more sense to think of it in terms of the Question, then maybe create a helper on the Question model - something like :

public function checkAnswer(Request $request)
{
  if (Question::checkAnswerIsCorrect($request->question_id, $request->answer_id) {
    return 'Correct';
  }
  return 'Fail!';
}
Going with the second option might be better as if you ever change the way that a correct answer is worked out (maybe there can be multiple 'correct' answers for instance) then your controller checkAnswer function doesn't have to change - just the code hidden inside the model's checkAnswerIsCorrect() one.

But as always - do what seems right/easy/simple for your project :-)




window
.Echo
.channel('at_school_database_organizations')
.listen('UpdateOrganizations', e => {
    
})