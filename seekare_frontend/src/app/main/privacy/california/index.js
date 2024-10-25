import React from "react";
import { Grid, Hidden, makeStyles } from "@material-ui/core";

import RightSidebar from "app/main/layouts/ClientLayout/RightSidebar";
import TagList from "app/main/shared-components/TagList";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "87vh",
    overflow: "hidden auto",
    margin: "auto",
    color: theme.palette.text.primary,
    "& h1": {
      textAlign: "center",
    },
    "& ul": {
      listStyleType: "lower-roman",
    },

    "& p": {
      "&.underline": {
        textDecoration: "underline",
      },
    },
  },
}));

const CaliforniaPolicy = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Hidden mdDown>
        <Grid item md={3}>
          <TagList />
        </Grid>
      </Hidden>
      <Grid item md={6}>
        <div className={classes.root}>
          <h1>CALIFORNIA CONSUMER PRIVACY ACT DISCLOSURES AND RIGHTS</h1>

          <h2>THIS SUPPLEMENT APPLIES ONLY TO CALIFONIA USERS</h2>
          <p>
            This Privacy Policy for California Residents supplements the
            information already contained in SeeKare general Privacy Policy and
            applies solely to all users, visitors, and others who reside in the
            State of California.
          </p>
          <p>
            SeeKare Privacy Policy for California Residents details the personal
            information that we may collect from you when you visit our website
            and make use of the SeeKare services. It also outlines the process
            for collecting, the purpose for which we use such data for, the
            sources from which we collect it, the limited circumstances under
            which we may share personal information, and provides you with
            specific choices and rights that you have as a California resident.
          </p>
          <ol style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <h2>1. What is the CCPA?</h2>
              <p>
                The CCPA is a California law that provides California residents
                certain rights to their personal information.
              </p>
              <p>
                California residents, called “consumers” in the CCPA, have the
                following rights:
              </p>
              <ul style={{ listStyleType: "square" }}>
                <li>
                  The right to request that we disclose certain information to
                  you about our collection and use of personal information over
                  the past 12 months
                </li>
                <li>
                  The right to request that we delete any of your personal
                  information that we collect from you and retained, subject to
                  certain exceptions
                </li>
                <li>
                  The right to opt-out of the sale of personal information by
                  us.
                </li>
                <li>
                  The right not to receive discriminatory treatment by us for
                  exercising the privacy rights conferred by the CCPA.
                </li>
              </ul>
              <p>
                We will explain more about how to exercise these rights below.
              </p>
            </li>
            <li>
              <h2>2. Information We Collect</h2>
              <p>
                The personal information that SeeKare collects, or has collected
                from users within the last twelve months prior to the time of
                this disclosure becoming effective. SeeKare collects or has
                collected the following categories of personal information from
                its users:
              </p>
              <ul>
                <li>
                  Personal identifiers such as your first name, last name, or
                  similar identifier, address, phone numbers, or IP address;
                </li>
                <li>
                  Internet or other electronic network activity information,
                  including content interaction information, such as content
                  downloads, search history and interaction data on your use of
                  our website and from links in SeeKare emails sent to you;
                </li>
                <li>
                  geolocation data, such as the location of your device or
                  computer; and
                </li>
                <li>
                  inference data, such as information about your purchase
                  preferences, feedback and survey responses.
                </li>
              </ul>
            </li>
            <li>
              <h2>3. How We Collect Personal Information</h2>
              <p>
                SeeKare obtains the categories of personal information listed
                above from the following sources:
              </p>
              <ul style={{ listStyleType: "square" }}>
                <li>
                  Directly from our platform users when they provide the
                  information to us.
                </li>
                <li>
                  Indirectly from you, as you navigate through the website and
                  engage with the services that we offer. Information collected
                  automatically may include usage details, IP addresses and
                  information collected through cookies, web beacons, and other
                  tracking technologies.
                </li>
                <li>
                  From third-party service providers under service contracts.
                </li>
              </ul>
            </li>
            <li>
              <h2>
                4. Categories of Personal Information disclosed for SeeKare
                Business Purpose
              </h2>
              <p>
                The personal information that we disclosed about consumers for a
                business purpose in the twelve months prior to the effective
                date of this Disclosure fall into the following categories
                established by the California Consumer Privacy Act.
              </p>
              <ul style={{ listStyleType: "square" }}>
                <li>
                  identifiers such as your name, email address, phone number, or
                  IP address;
                </li>
                <li>
                  your age, gender, or other protected classifications, for
                  example, if you choose to participate in a survey distributed
                  by SeeKare or fill the User Content form;
                </li>
                <li>geolocation data from your IP address.</li>
              </ul>
            </li>
            <li>
              <h2>5. Your Rights and Choices</h2>
              <p>
                The CCPA provides California residents with specific rights
                regarding their personal information. This section describes
                your CCPA rights and explains how to exercise those rights.
              </p>
              <p>
                <u>Access to Specific Information and Data Portability:</u>
              </p>
              <p>
                You have the right to request that SeeKare disclose certain
                information to you about our collection and use of your personal
                information over the past twelve (12) months. Once we receive
                and verify your request, we will disclose to you:
              </p>
              <ul style={{ listStyleType: "square" }}>
                <li>
                  The categories of personal information we collected about you
                </li>
                <li>
                  The categories of sources for the personal information we
                  collected about you
                </li>
                <li>
                  Our business or commercial purpose for collecting that
                  personal information
                </li>
                <li>
                  The specific pieces of personal information we collected about
                  you (also called a data portability request)
                </li>
              </ul>
            </li>
            <li>
              <h2>
                6. Right to Request Access to or Deletion of Personal
                Information
              </h2>
              <p>
                You may have the right under the California Consumer Privacy Act
                to request information about the collection of your personal
                information by SeeKare, or access to or deletion of your
                personal information. But only you, or someone legally
                authorized to act on your behalf, may make a verifiable consumer
                request related to your personal information. Agents must submit
                proof that they have been authorized by the consumer to act on
                their behalf. Making a verifiable consumer request does not
                require you to create an account with us. We will only use
                personal information provided in a verifiable consumer request
                to verify the requestor’s identity or authority to make the
                request. If you wish to do any of these things, please contact
                us. Depending on your data choices and subject to applicable
                regulations, certain services may be limited or unavailable.
              </p>
              <p>
                We may, however, deny your deletion request if retaining the
                information is necessary for us or our service providers(s) to:
              </p>
              <ul style={{ listStyleType: "square" }}>
                <li>
                  Complete the purpose for which we collected the personal
                  information, provide a service that you requested, take
                  actions reasonably anticipated within the context of our
                  ongoing business relationship with you, or otherwise perform
                  our contract with you.
                </li>
                <li>
                  Detect security incidents, protect against malicious,
                  deceptive, fraudulent, or illegal activity, or prosecute those
                  responsible for such activities.
                </li>
                <li>
                  Exercise free speech, ensure the right of another consumer to
                  exercise their free speech rights or exercise another right
                  provided for by law.
                </li>
                <li>
                  Comply with the California Electronic Communications Privacy
                  Act (Cal. Penal Code § 1546 et. seq. or other legal
                  obligation.
                </li>
                <li>
                  Make other internal and lawful uses of that information that
                  are compatible with the context in which you provided it.
                </li>
              </ul>
            </li>
            <li>
              <h2>7. No Discrimination Rights</h2>
              <p>
                You have the right not to receive discriminatory treatment for
                the exercise of your rights under the CCPA and SeeKare will not
                discriminate against any consumer for exercising their rights
                under the California Consumer Privacy Act.
              </p>
            </li>
            <li>
              <h2>8. Changes to This Notice</h2>
              <p>
                SeeKare reserves the right to amend this privacy notice at our
                discretion and at any time. When we make changes to this privacy
                notice, and when we make changes to this CCPA Policy, we will
                post the updated notice on the website and update the CCPA
                Policy effective date at the top of the page. Your continued use
                of our website and/or the services following the posting of
                changes constitutes your acceptance of such changes.
              </p>
            </li>
          </ol>
        </div>
      </Grid>
      <Hidden>
        <Grid item md={3}>
          <RightSidebar />
        </Grid>
      </Hidden>
    </Grid>
  );
};
export default CaliforniaPolicy;
