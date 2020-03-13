/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import Talk from 'talkjs';

/* Just enable import react-pdf library. it makes TalkJS not working in IE11  */
// import { Document, Page } from 'react-pdf';

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.inbox = undefined;
  }

  componentDidMount() {
    // Promise can be `then`ed multiple times
    Talk.ready
      .then(() => {
        const me = new Talk.User({
          id: '12345231',
          name: 'George Looney',
          email: 'george@looney.net',
          photoUrl: 'https://talkjs.com/docs/img/george.jpg',
          welcomeMessage: 'Hey there! How are you? :-)',
        });

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: 'tyC1G6i8',
            me,
          });
        }

        const other = new Talk.User({
          id: '54322',
          name: 'Ronald Raygun V2',
          email: 'ronald_v2@teflon.com',
          photoUrl: 'https://talkjs.com/docs/img/ronald.jpg',
          welcomeMessage: 'Hey there! Love to chat :-)',
        });

        // You control the ID of a conversation. oneOnOneId is a helper method that generates
        // a unique conversation ID for a given pair of users.
        const conversationId = Talk.oneOnOneId(me, other);

        const conversation = window.talkSession.getOrCreateConversation(
          conversationId,
        );
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        this.inbox = window.talkSession.createInbox({
          selected: conversation,
        });
        this.inbox.mount(this.container);
      })
      .catch(e => console.error(e));
  }

  componentWillUnmount() {
    if (this.inbox) {
      this.inbox.destroy();
    }
  }

  render() {
    return (
      <span>
        <div style={{ height: '500px' }} ref={c => (this.container = c)}>
          TalkJS Loading...
        </div>
      </span>
    );
  }
}
