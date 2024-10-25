import React from "react";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

import CustomButton from "app/main/shared-components/Button";
import { closeModal, openModal } from "app/store/ui/actions";

const useStyles = makeStyles({
  root: {
    maxHeight: "87vh",
    borderRadius: "8px",
    backgroundColor: "white",
    padding: "2rem",
    overflow: "hidden auto",
  },
  actionButton: {
    margin: "0 0.5rem",
  },
});

const TermsModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClickAgree = () => {
    dispatch(closeModal("TERMS_MODAL"));
    // dispatch(openModal('REGISTER_MODAL'));
  };

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h4">TERMS AND CONDITIONS AGREEMENT</Typography>
      </Box>
      <Box p={2}>
        <p>
          Welcome to SeeKare, the website and online service of SEROK
          (“SeeKare,” “we,” or “us”). This is a legally binding agreement
          between you and SeeKare. Please make sure you read it as it explains
          the terms and conditions guiding your usage of SeeKare online
          services, website, and newsletters made available to you through or in
          connection with the service (collectively the “Service”).
        </p>

        <p>
          By visiting our site, subscribing to our newsletter, or engage in any
          of the services provided by SeeKare, you agree to be bound by the
          following terms and conditions (“Terms and Conditions”, “Terms”),
          including those additional terms and conditions and policies
          referenced herein and/or available by hyperlink. These Terms expressly
          supersede prior agreements or arrangements with you. SeeKare may
          immediately terminate these Terms or any Services with respect to you,
          or generally, cease offering or deny access to the Services or any
          portion thereof, at any time for any reason.
        </p>
        <h2>Privacy</h2>
        <p>
          Please refer to our Privacy Policy for information on how we collect,
          use and disclose information from our users. You acknowledge and agree
          that your use of the Services is subject to our Privacy Policy.
        </p>
        <h2>Medical Advice Disclaimer</h2>
        <p>
          This Web Site, together with and including all Content, products and
          services thereon, wherever from or however derived and including all
          Content on the SeeKare Site (the “Web Site”) is not a substitute for
          independent professional medical advice from your qualified health
          care professional and should not be taken as such. SeeKare and its
          services do not constitute the practice of any medical, nursing or
          other professional health care advice, diagnosis or treatment. You
          should always talk to your health care provider for diagnosis and
          treatment, including your specific medical needs. None of the products
          or services offered through this website represents or warrants that
          any particular service or product is safe, appropriate or effective
          for you and you acknowledge that you will not rely on any of its
          Contents, but will treat the information as being only of a general
          and informational nature.
        </p>
        <h2>Changes to these terms</h2>
        <p>
          SeeKare reserve the right, at our sole discretion, to change or modify
          portions of these Terms at any time. You should periodically visit
          this page to review the current Terms so you are aware of any revision
          to which you are bound. If we do this, we will post the changes to
          these Terms on this page and will indicate at the top of this page the
          date these terms were last revised. We may also notify you, either
          through the Services user interface, in an email notification or
          through other reasonable means.
        </p>
        <p>
          Any such changes will become effective for existing users no earlier
          than ten (10) days after they are posted, except that changes
          addressing new functions of the Services or changes made for legal
          reasons will be effective immediately. Your continued use of the
          Service after the date any such changes become effective constitutes
          your acceptance of the new Terms. If you do not agree to abide by
          these or any future Terms, do not use or access (or continue to use or
          access) the Service.
        </p>
        <h2>Eligibility</h2>
        <p>
          You may use the Service only if you can form a binding contract with
          SeeKare, and only in compliance with this Agreement and all applicable
          local, state, national, and international laws, rules and regulations.
          Any use or access to the Service by anyone under 13 is strictly
          prohibited and in violation of this Agreement. The Service is not
          available to any Users previously removed from the Service by SeeKare.
        </p>
        <h2>License and Access.</h2>
        <p>
          Subject to your compliance with these Terms and Conditions of Service,
          SeeKare grants you a limited, non-exclusive, non-sublicensable,
          revocable, non-transferable license to: (i) access and use the site
          and the services provided through the site on your personal device
          solely in connection with your use of the Services; and (ii) access
          and use any content, information and related materials that may be
          made available through the Services, in each case solely for your
          personal, noncommercial use. Any rights not expressly granted herein
          are reserved by SeeKare and SeeKare's licensors.
        </p>
        <p>
          This license does not include any resale or commercial use of any of
          SeeKare Service, or its contents.
        </p>
        <h2>User Account and Account Security</h2>
        <p>
          You may need to create an SeeKare account to use certain SeeKare
          services. You will need to register and obtain an account, username
          and password. When you register, the information you provide to us
          during the registration process will help us in offering content,
          service, and management of your account. You are solely responsible
          for maintaining the confidentiality of your account, username, and
          password and for all activities associated with or occurring under
          your Account.
        </p>
        <p>
          You must notify us immediately of any unauthorized use of your account
          and any other breach of security.
        </p>
        <p>
          We cannot and will not be responsible for any loss or damage arising
          from your failure to comply with the foregoing requirements or as a
          result of the use of your account, either with or without your
          knowledge, prior to your notifying us of unauthorized access to your
          account. You may not transfer your account to any other person and you
          may not use anyone else's account at any time without the permission
          of the account holder.
        </p>
        <h2>Content Ownership and Intellectual Property Rights</h2>
        <p>
          As between you and us, all content made available to you through the
          service is owned by us. We claim all property rights, including
          intellectual property rights, for this content and you are not allowed
          to infringe upon those rights. We will prosecute to the fullest extent
          of the law anyone who attempts to steal our property.
        </p>
        <p>
          You agree not to copy content from our website without our permission.
          Any requests to use our content should be submitted to us by email.
        </p>
        <p>
          If you believe that your intellectual property rights have been
          infringed upon by our website content, please notify us by sending an
          email. Please describe in detail the alleged infringement, including
          the factual and legal basis for your claim of ownership.
        </p>
        <p>
          This platform is controlled and operated by SeeKare and all material
          on this site, including images, illustrations, audio clips, and video
          clips, are protected by copyrights, trademarks, and other intellectual
          property rights.
        </p>
        <p>
          Material made available to you through the service is solely for your
          personal, non-commercial use. You must not copy, reproduce, republish,
          upload, post, transmit or distribute such material in any way,
          including by email or other electronic means and whether directly or
          indirectly and you must not assist any other person to do so. Any use
          of the Site or the Site Content other than as specifically authorized
          herein, without our prior written permission, is strictly prohibited
          and will terminate the license granted herein. Such unauthorized use
          may also violate applicable laws including without limitation
          copyright and trademark laws and applicable communications regulations
          and statutes. Unless explicitly stated herein, nothing in these Terms
          shall be construed as conferring any license to intellectual property
          rights, whether by estoppel, implication or otherwise. This license is
          revocable by us at any time without notice and with or without cause.
        </p>
        <p>
          Without the prior written consent of the owner, modification of the
          materials, use of the materials on any other website or networked
          computer environment or use of the materials for any purpose other
          than personal, non-commercial use is a violation of the copyrights,
          trademarks and other proprietary rights, and is prohibited. Any use
          for which you receive any remuneration, whether in money or otherwise,
          is a commercial use for the purposes of this clause.
        </p>
        <h2>Video and Audio Content</h2>
        <p>
          The services we make available to you may contain one or more videos
          and/or audio recordings (individually and collective hereinafter
          referred to as the “Recordings”). This section describes our
          respective rights and responsibilities with regard to the Recordings.
        </p>
        <p>
          All Recordings are to be watched and/or listened to for informational
          purposes only. Recordings are not intended to provide specific medical
          or physical advice, or any other advice whatsoever to you, any other
          individual or company, and should not be relied upon in that regard.
          Any products or services described in the Recordings are only offered
          in jurisdictions where they may be legally offered. Information
          provided in Recordings is not all- inclusive, is limited to
          information that is made available, and such information should not be
          relied upon as all-inclusive or accurate.
        </p>
        <h2>User Representation and Platform Use</h2>
        <p>
          You hereby represent, warrant and agree that no materials of any kind
          submitted through your account or otherwise posted or shared by you
          through the service will be in violation of the rights of any third
          party, including but not limited to the copyright, trademark,
          publicity, privacy or other personal or proprietary rights.
        </p>
        <p>
          Although we are committed to providing a safe user experience, we do
          not guarantee that the platform, or any content in it, will be safe,
          error-free or uninterrupted, or that it will be free from bugs or
          viruses. From time to time, access to the service may be interrupted,
          suspended or restricted, including because if a fault, error or
          unforeseen circumstances or due to scheduled maintenance. We shall not
          be liable to you for any loss or damage that you may suffer as a
          result of the service being unavailable at any time for any reason.
        </p>
        <p>
          You agree, undertake and confirm that your use of the platform shall
          be strictly in accordance with the following binding guidelines. You
          shall not host, display, upload, modify, publish, transmit, update or
          share any information which:
        </p>
        <ul>
          <li>
            <p>
              belongs to another person and to which you do not have any right
              to make use of or promotes an illegal or unauthorized copy of
              another person's copyrighted work such as providing pirated
              computer programs or links to them, providing information to
              circumvent manufacture-installed copy-protect devices;
            </p>
          </li>
          <li>
            <p>
              is grossly harmful, harassing, blasphemous, defamatory, obscene,
              pornographic, paedophilic, libellous, invasive of another's
              privacy, hateful, or racially, ethnically objectionable,
              disparaging, relating or encouraging money laundering or gambling,
              or otherwise unlawful in any manner whatever; or,
            </p>
          </li>
          <li>
            <p>
              is patently offensive to the online community, such as sexually
              explicit content, or content that promotes obscenity, paedophilia,
              racism, bigotry, hatred or physical harm of any kind against any
              group or individual or provides material that exploits people in a
              sexual, violent or otherwise inappropriate manner or solicits
              personal information from anyone;
            </p>
          </li>
          <li>
            <p>
              Involves the transmission of "junk mail", "chain letters", or
              unsolicited mass mailing or "spamming" or contains any trojan
              horses, worms, time bombs, cancel bots, easter eggs or other
              computer programming routines that may damage, detrimentally
              interfere with, diminish value of, surreptitiously intercept or
              expropriate any system, data or personal information;
            </p>
          </li>
          <li>
            <p>
              promotes illegal activities or conduct that is abusive,
              threatening, obscene, defamatory or libelous;
            </p>
          </li>
          <li>
            <p>
              Provides instructional information about illegal activities such
              as making or buying illegal weapons, violating someone's privacy,
              or providing or creating computer viruses; contains video,
              photographs, or images of another person (with a minor or an
              adult);
            </p>
          </li>
          <li>
            <p>
              tries to gain unauthorized access or exceeds the scope of
              authorized access to the Website or to profiles, blogs,
              communities, account information, bulletins, or other areas of the
              Website or solicits passwords or personal identifying information
              for commercial or unlawful purposes from other users.
            </p>
          </li>
          <li>
            <p>
              Interferes with another user's use and enjoyment of the website or
              any other individual's user and enjoyment of similar services;
            </p>
          </li>
          <li>
            <p>
              Refers to any website or URL that, in our sole discretion,
              contains material that is inappropriate for the Website or any
              other website, contains content that would be prohibited or
              violates the letter or spirit of these Terms of Use.
            </p>
          </li>
        </ul>

        <h2>Obscene and Offensive Content</h2>
        <p>
          We are not responsible for any obscene or offensive content that you
          receive or view from others while using our service. However, if you
          do receive or view such content, please contact us by email so that we
          can investigate the matter. Although we are not obligated to do so, we
          reserve the right to monitor, investigate, and remove obscene or
          offensive material posted to our website.
        </p>
        <h2>User Content and Submissions</h2>
        <p>
          You understand that all information, data, text, software, music,
          sound, photographs, graphics, video, advertisements, messages or other
          materials submitted, posted or displayed by You on or through the
          service (“User Content”) is the sole responsibility of the person from
          which such User Content originated. We claim no ownership or control
          over any User Content. You or a third party licensor, as appropriate,
          retain all patent, trademark and copyright to any User Content You
          submit, post or display on or through the website, and you are
          responsible for protecting those rights, as appropriate.
        </p>
        <p>
          By submitting, posting or displaying User Content on or through
          SeeKare service, you grant us a worldwide, non-exclusive, royalty-free
          license to reproduce, adapt, distribute and publish such User Content.
          In addition, by submitting, posting or displaying User Content which
          is intended to be available to the general public, you grant us a
          worldwide, non-exclusive, royalty-free license to reproduce, adapt,
          distribute and publish such User Content for the purpose of promoting
          our Services. We may discontinue this licensed use within a
          commercially reasonable period after such User Content is removed from
          the Site.
        </p>
        <p>
          We reserve the right to refuse to accept, post, display or transmit
          any User Content in its sole discretion. If you post User Content in
          any public area of the Site, you also permit any user of the Site to
          access, display, view, store and reproduce such User Content for
          personal use. Subject to the foregoing, the owner of such User Content
          placed on the Site retains any and all rights that may exist in such
          User Content.
        </p>
        <p>
          We do not in any way have any obligation to screen User Content,
          communications or information in advance and is not responsible for
          screening or monitoring User Content posted by any user of the Site.
          We may review and remove any User Content that, in its sole judgment,
          violates these Terms, violates applicable laws, rules or regulations,
          is abusive, disruptive, offensive or illegal, or violates the rights
          of, or harms or threatens the safety of, users of the Site. We reserve
          the right to prevent you from further access to the Site for violating
          these Terms of Use or applicable laws, rules or regulations.
        </p>
        <p>
          We do not represent or guarantee the truthfulness, accuracy, or
          reliability of User Content or endorse any opinions expressed by users
          of the Site. You acknowledge that any reliance on material posted by
          other users will be at your own risk.
        </p>
        <h2>Disclaimer of Warranties and Limitation of Liability</h2>
        <p>
          THE INFORMATION MADE AVAILABLE TO YOU THROUGH OUR SERVICES IS PROVIDED
          ON AN “AS IS,” “AS AVAILABLE” BASIS. YOU AGREE THAT YOUR USE OF OUR
          SERVICE IS AT YOUR SOLE RISK. WE DISCLAIM ALL WARRANTIES OF ANY KIND,
          INCLUDING BUT NOT LIMITED TO, ANY EXPRESS WARRANTIES, STATUTORY
          WARRANTIES, AND ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR
          A PARTICULAR PURPOSE, AND NON- INFRINGEMENT. WE DO NOT WARRANT THAT
          OUR SERVICE WILL ALWAYS BE AVAILABLE, ACCESS WILL BE UNINTERRUPTED, BE
          ERROR-FREE, MEET YOUR REQUIREMENTS, OR THAT ANY DEFECTS IN OUR
          SERVICE/WEBSITE WILL BE CORRECTED.
        </p>
        <p>
          INFORMATION MADE AVAILABLE TO YOU VIA THE SERVICES SHOULD NOT
          NECESSARILY BE RELIED UPON AND SHOULD NEVER BE CONSTRUED TO BE
          PROFESSIONAL MEDICAL ADVICE FROM US. WE DO NOT GUARANTEE THE ACCURACY
          OR COMPLETENESS OF ANY OF THE INFORMATION PROVIDED, AND ARE NOT
          RESPONSIBLE FOR ANY LOSS RESULTING FROM YOUR RELIANCE ON SUCH
          INFORMATION.
        </p>
        <p>
          IF YOUR JURISDICTION DOES NOT ALLOW LIMITATIONS ON WARRANTIES, THIS
          LIMITATION MAY NOT APPLY TO YOU. YOUR SOLE AND EXCLUSIVE REMEDY
          RELATING TO YOUR USE OF THE SITE SHALL BE TO DISCONTINUE USING THE
          SITE.
        </p>
        <p>
          UNDER NO CIRCUMSTANCES WILL WE BE LIABLE OR RESPONSIBLE FOR ANY
          DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL (INCLUDING DAMAGES FROM
          LOSS OF BUSINESS, LOST PROFITS, LITIGATION, OR THE LIKE), SPECIAL,
          EXEMPLARY, PUNITIVE, OR OTHER DAMAGES, UNDER ANY LEGAL THEORY, ARISING
          OUT OF OR IN ANY WAY RELATING TO OUR WEBSITE, YOUR WEBSITE USE, OR THE
          CONTENT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
        <p>
          OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO OUR
          WEBSITE SHALL NOT EXCEED ONE HUNDRED ($100) DOLLARS AND THAT AMOUNT
          SHALL BE IN LIEU OF ALL OTHER REMEDIES WHICH YOU MAY HAVE AGAINST US
          OR OUR AFFILIATES (IF ANY). ANY SUCH CLAIM SHALL BE SUBJECT TO
          CONFIDENTIAL BINDING ARBITRATION AS DESCRIBED LATER IN THIS DOCUMENT.
        </p>
        <h2>Indemnification</h2>
        <p>
          You understand and agree that you will indemnify, defend and hold us
          and our affiliates (if any) harmless from any liability, loss, claim
          and expense, including reasonable attorney’s fees, arising from your
          use of our website or your violation of these terms, conditions, and
          policies.
        </p>
        <h2>Links to Other Sites or Resources</h2>
        <p>
          The Services may contain links to third-party websites or resources.
          We provide these links only as a convenience and are not responsible
          for the content, products or services on or available from those
          websites or resources or links displayed on such websites. You
          acknowledge sole responsibility for and assume all risk arising from,
          your use of any third-party websites or resources.
        </p>
        <h2>Governing Law and Dispute Resolution</h2>
        <p className="underline">Governing Law</p>
        <p>
          These Terms and any action related thereto will be governed by the
          laws of the State of California without regard to its conflict of laws
          provisions.
        </p>
        <h2>General Terms</h2>
        <p>
          <u>Entire Agreement:</u> These Terms constitute the entire and
          exclusive understanding and agreement between SeeKare and you
          regarding the Services, Products and Content, and these Terms
          supersede and replace any and all prior oral or written understandings
          or agreements between SeeKare and you regarding the Services, Products
          and Content.
        </p>
        <p>
          <u>Severability:</u> If any provision of these Terms is held invalid
          or unenforceable, that provision will be enforced to the maximum
          extent permissible and the other provisions of these Terms will remain
          in full force and effect.
        </p>
        <p>
          <u>Assignment:</u> You may not assign or transfer these Terms, by
          operation of law or otherwise, without SeeKare’s prior written
          consent. Any attempt by you to assign or transfer these Terms, without
          such consent, will be null and of no effect. SeeKare may freely assign
          or transfer these Terms without restriction. Subject to the foregoing,
          these Terms will bind and inure to the benefit of the parties, their
          successors and permitted assigns.
        </p>
        <p>
          <u>Notices:</u> Any notices or other communications provided by
          SeeKare under these Terms, including those regarding modifications to
          these Terms, will be given: (i) by SeeKare via email; or (ii) by
          posting to the Services. For notices made by e-mail, the date of
          receipt will be deemed the date on which such notice is transmitted.
        </p>
        <p>
          <u>No Waiver:</u> SeeKare’s failure to enforce any right or provision
          of these Terms will not be considered a waiver of such right or
          provision. The waiver of any such right or provision will be effective
          only if in writing and signed by a duly authorized representative of
          SeeKare. Except as expressly set forth in these Terms, the exercise by
          either party of any of its remedies under these Terms will be without
          prejudice to its other remedies under these Terms or otherwise.
        </p>
        <h2>Contact Information</h2>
        <p>
          If you have any questions about these Terms or the Services or
          Products, please contact SeeKare via our contact channels.
        </p>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <CustomButton
          fullwidth
          type="submit"
          size="md"
          variant="contained"
          color="secondary"
          className={classes.actionButton}
          onClick={onClickAgree}
        >
          Agree
        </CustomButton>
      </Box>
    </Box>
  );
};

export default TermsModal;
