class Views {
    find(controller, obj) {
        return controller.find(obj);
    }
    create(controller, data) {
        return controller.create(data);
    }
    update(controller, existObj, updatedObj) {
        controller.update(existObj, updatedObj);
    }
    delete(controller, data) {
        controller.delete(data);
    }
}
exports.views = new Views()