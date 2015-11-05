angular.module('qrate.components.addLinkModal', [
  'qrate.components.addLinkModal.responseModal'
])
  .controller('AddLinkModalCtrl', AddLinkModalCtrl);

function AddLinkModalCtrl($rootScope, $uibModalInstance, $uibModal, _DEV, Helpers, CurrentUser, Junk) {

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

    var selectedTagsNamesToExclude = Helpers.mapIds(ctrl.newLinkTags);

    Junk.getTagsByQuery(query, selectedTagsNamesToExclude).then(function(tags) {
      log("tags for autocomplete", tags);

      if (tags.length) {
        ctrl.tagsToSelectFrom = tags;
      } else {
        ctrl.tagsToSelectFrom = [{ name: query }]; // give user the option to add a tag that haven't been used yet
      }
    });

  }

  function submit() {

    closeModal();

    ctrl.isFormProcessing = true;

    var data = {
      creator: null, // currentUser.id, // change after implementing CurrentUser // discussion about changing to creatorId
      type: "qrate", 
      collaboration: 9, // discussion about changing to collaborationId, + answer to wtf is this :)
      content: 
      {
        url: ctrl.newLinkUrl,
        evaluation: ctrl.newLinkEvaluation,
        tags: ctrl.newLinkTags
      }
    };

    Junk.sendLink().then(function(response) {
      log(response);
      openAddLinkResponseModal(response);
    });

  }

  function openAddLinkResponseModal(isLinkExists) {
    var modal = $uibModal.open({
      templateUrl: 'components/addLinkModal/addLinkResponseModal/addLinkResponseModal.html',
      controller: 'AddLinkResponseModalCtrl',
      resolve: { isLinkExists: isLinkExists },
      bindToController: true,
      controllerAs: 'ctrl',
      scope: $rootScope.$new() // can't pass the $scope of this modal to another modal so need to create a new one
    });
  }

}