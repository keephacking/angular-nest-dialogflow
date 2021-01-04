import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import dialogflow from '@google-cloud/dialogflow';
import { EmailService } from '../email/email.service';

const PROJECT_ID = 'bteam-ecommerce';

@Injectable()
export class DfService {
  projectId = PROJECT_ID;
  constructor(private emailService: EmailService) {}

  /**
   * Send a query to the dialogflow agent, and return the query result.
   */
  async runQuery(text: string, reqSessionId: string) {
    // Set cred json to env path
    this._setCredPath();

    // A unique identifier for the given session
    const sessionId = reqSessionId;

    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();

    const sessionPath = sessionClient.projectAgentSessionPath(
      this.projectId,
      sessionId,
    );

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
          languageCode: 'en-US',
        },
      },
    };

    try {
      // Send request and log result
      const responses = await sessionClient.detectIntent(request);

      console.log('Detected intent');
      const result = responses[0].queryResult;
      // console.log(`  Result: `, result);
      console.log(`  Query: ${result.queryText}`); //  "Query:" + result.queryText
      console.log(`  Response: ${result.fulfillmentText}`);

      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
        await this._applyAction(result.action);
        return result.fulfillmentText;
      }

      console.log(result);
    } catch (err) {
      console.error(err);
    }
    return 'Sorry something went wrong';
  }

  private async _applyAction(action: string) {
    switch (action) {
      case 'bot.start':
        await this.emailService.sendMail();
        break;

      default:
        break;
    }
  }
  private _setCredPath() {
    process.env['GOOGLE_APPLICATION_CREDENTIALS'] =
      __dirname + '\\df_auth.json';
  }
}
