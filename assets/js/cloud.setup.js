/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress"]},"updateBillingCard":{"verb":"PUT","url":"/api/v1/account/update-billing-card","args":["stripeToken","billingCardLast4","billingCardBrand","billingCardExpMonth","billingCardExpYear"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},"signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","password","fullName"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"deliverContactFormMessage":{"verb":"POST","url":"/api/v1/deliver-contact-form-message","args":["emailAddress","topic","fullName","message"]},"addTeams":{"verb":"POST","url":"/api/v1/teams/add-teams","args":["teamName","speakerOneName","speakerTwoName","speakerThreeName","instID"]},"addAdjs":{"verb":"POST","url":"/api/v1/adjs/add-adjs","args":["adjName","instID"]},"deleteAdjs":{"verb":"DELETE","url":"/api/v1/adjs/delete-adjs","args":["adjID"]},"addVenues":{"verb":"POST","url":"/api/v1/venues/add-venues","args":["venueName"]},"deleteVenues":{"verb":"POST","url":"/api/v1/venues/delete-venues","args":["venueID"]},"addInstitutions":{"verb":"POST","url":"/api/v1/institutions/add-institutions","args":["instName"]},"deleteInstitutions":{"verb":"POST","url":"/api/v1/institutions/delete-institutions","args":["instID"]},"generateMatchups":{"verb":"POST","url":"/api/v1/generate-matchups","args":["roundNo"]},"enterResults":{"verb":"POST","url":"/api/v1/enter-results","args":[]},"editAdjs":{"verb":"PUT","url":"/api/v1/adjs/update-adjs","args":["adjID","name","instID"]},"uploadFile":{"verb":"POST","url":"/api/v1/upload-file","args":[""]}}
  /* eslint-enable */

});
