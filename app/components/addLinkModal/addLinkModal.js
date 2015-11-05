angular.module('qrate.components.addLinkModal', [])
  .controller('AddLinkModalCtrl', AddLinkModalCtrl);

function AddLinkModalCtrl($uibModalInstance, _DEV, Helpers, CurrentUser, Junk) {

  var log = _DEV.log('ADD LINK MODAL CTRL');

  var currentUser = CurrentUser.get();

  var ctrl = this;

  angular.extend(ctrl, {
    closeModal: closeModal,
    refreshTagsToSelectFrom: refreshTagsToSelectFrom,
    submit: submit,
    tagsToSelectFrom: [],
    isFormProcessing: false
  });

  init();

  function init() {
    log("init");
  }

  function closeModal() {
    $uibModalInstance.dismiss("closed by user");
  }

  function refreshTagsToSelectFrom(query) {
    if (! query)
      return;

    log("refreshTagsToSelectFrom by query:", query);

    var selectedTagsIdsToExclude = Helpers.mapIds(ctrl.newLinkTags);

    Junk.getTagsByQuery(query, selectedTagsIdsToExclude).then(function(tags) {
      log("tags for autocomplete", tags);

      if (tags.length) {
        ctrl.tagsToSelectFrom = tags;
      } else {
        ctrl.tagsToSelectFrom = [{ name: query }]; // give user the option to add a tag that haven't been used yet
      }
    });

  }

  function submit() {
    ctrl.isFormProcessing = true;
    Junk.sendLink({
      creator: currentUser.id, // discussion about changing to creatorId
      type: "qrate", 
      collaboration: 9, // discussion about changing to collaborationId, + answer to wtf it this :)
      content: 
      {
        title: "Sheker inc.", // waiting for answer as to what is this
        url: ctrl.newLinkUrl,
        evaluation: ctrl.newLinkEvaluation,
        tags: ctrl.newLinkTags
      }
    }).then(function() {
      log('submitted!');
    });
  }

}