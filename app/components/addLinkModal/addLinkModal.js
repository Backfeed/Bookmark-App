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
    searchText: null,
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

    log('submit', ctrl.newLinkUrl, 'evalution', ctrl.newLinkEvaluation, 'tags', ctrl.newLinkTags);

    // closeModal();

    ctrl.isFormProcessing = true;

    Junk.sendLink(ctrl.newLinkUrl, ctrl.newLinkEvaluation, ctrl.newLinkTags).then(
      function(response) {
        ctrl.isFormProcessing = false;
        log('CB: submit', response);
        // openAddLinkResponseModal(response);
      }, 
      function(err) {
        ctrl.isFormProcessing = false;
        log('CB: submit: Error', err);
      }
    );

  }

  function openAddLinkResponseModal(isLinkExists) {
    var modal = $uibModal.open({
      templateUrl: 'components/addLinkModal/addLinkResponseModal/addLinkResponseModal.html',
      controller: 'AddLinkResponseModalCtrl',
      resolve: { isLinkExists: isLinkExists },
      size: 'lg',
      bindToController: true,
      controllerAs: 'ctrl',
      scope: $rootScope.$new() // can't pass the $scope of this modal to another modal so need to create a new one
    });
  }

}