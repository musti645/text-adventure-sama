import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ClassificationTrainer {
    trainClassifier(classifier) {
        return new Promise((resolve) => {
            classifier.addDocument('use keys', 'use');
            classifier.addDocument('use knob', 'use');
            classifier.addDocument('use old pen', 'use');
            classifier.addDocument('use rusty knife', 'use');
            classifier.addDocument('open door', 'use');
            classifier.addDocument('open oven', 'use');
            classifier.addDocument('open window', 'use');
            classifier.addDocument('interact with animal', 'use');
            classifier.addDocument('interact person', 'use');
            classifier.addDocument('close door', 'use');
            classifier.addDocument('close chest', 'use');
            classifier.addDocument('shut window', 'use');
            classifier.addDocument('shut the lid', 'use');
            classifier.addDocument('drink soda', 'use');
            classifier.addDocument('drink water', 'use');
            classifier.addDocument('eat mushrooms', 'use');
            classifier.addDocument('eat food', 'use');
            classifier.addDocument('look at house', 'look_at');
            classifier.addDocument('look at the chair', 'look_at');
            classifier.addDocument('inspect door', 'look_at');
            classifier.addDocument('inspect knife', 'look_at');
            classifier.addDocument('check window', 'look_at');
            classifier.addDocument('check fireplace', 'look_at');
            classifier.addDocument('analyze notes', 'look_at');
            classifier.addDocument('analyze keys', 'look_at');
            classifier.addDocument('read book', 'look_at');
            classifier.addDocument('read letter', 'look_at');
            classifier.addDocument('observe darkness', 'look_at');
            classifier.addDocument('observe forrest', 'look_at');
            classifier.addDocument('go inside', 'go_to');
            classifier.addDocument('go outside', 'go_to');
            classifier.addDocument('enter building', 'go_to');
            classifier.addDocument('enter home', 'go_to');
            classifier.addDocument('leave house', 'go_to');
            classifier.addDocument('leave hut', 'go_to');
            classifier.addDocument('run away', 'go_to');
            classifier.addDocument('run into the darkness', 'go_to');
            classifier.addDocument('walk to place', 'go_to');
            classifier.addDocument('walk to the shed', 'go_to');
            classifier.addDocument('walk into the bar', 'go_to');
            classifier.addDocument('go to Peter', 'go_to');
            classifier.addDocument('go in to the forrest', 'go_to');
            classifier.addDocument('go into the cellar', 'go_to');
            classifier.addDocument('take keys', 'pick_up');
            classifier.addDocument('take up book', 'pick_up');
            classifier.addDocument('take notebook', 'pick_up');
            classifier.addDocument('pick up a lighter', 'pick_up');
            classifier.addDocument('pick up leash', 'pick_up');
            classifier.addDocument('put something into bag', 'pick_up');
            classifier.addDocument('put water bottle into inventory', 'pick_up');
            classifier.addDocument('gather mushrooms', 'pick_up');
            classifier.addDocument('collect stones', 'pick_up');
            classifier.addDocument('acquire medal', 'pick_up');
            classifier.addDocument('dance', 'do');
            classifier.addDocument('sit', 'do');
            classifier.addDocument('stand', 'do');
            classifier.addDocument('sleep', 'do');
            classifier.addDocument('fish', 'do');
            classifier.addDocument('do', 'do');
            classifier.addDocument('write', 'do');
            classifier.addDocument('read', 'do');
            classifier.addDocument('find', 'do');
            classifier.addDocument('work', 'do');
            classifier.addDocument('try', 'do');
            classifier.addDocument('feel', 'do');
            classifier.addDocument('create', 'do');
            classifier.addDocument('speak', 'do');
            classifier.addDocument('talk', 'do');
            classifier.addDocument('offer', 'do');
            classifier.addDocument('buy', 'do');
            classifier.addDocument('kill', 'do');
            classifier.addDocument('beat', 'do');
            classifier.addDocument('harm', 'do');
            classifier.addDocument('jump', 'do');
            classifier.addDocument('sell', 'do');
            classifier.addDocument('pull', 'do');
            classifier.addDocument('push', 'do');
            classifier.addDocument('put', 'do');
            classifier.events.on('trainedWithDocument', () => resolve());
            classifier.train();
            resolve();
        });
    }
}
ClassificationTrainer.ɵprov = i0.ɵɵdefineInjectable({ factory: function ClassificationTrainer_Factory() { return new ClassificationTrainer(); }, token: ClassificationTrainer, providedIn: "root" });
ClassificationTrainer.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NpZmljYXRpb24tdHJhaW5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L0Rva3VtZW50ZS9SZXBvc2l0b3JpZXMvVGV4dEFkdmVudHVyZVNhbWEvdGV4dC1hZHZlbnR1cmUtc2FtYS9wcm9qZWN0cy90ZXh0LWFkdmVudHVyZS1zYW1hL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9jbGFzc2lmaWNhdGlvbi10cmFpbmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPM0MsTUFBTSxPQUFPLHFCQUFxQjtJQUM5QixlQUFlLENBQUMsVUFBbUM7UUFDL0MsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLFVBQVUsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0RCxVQUFVLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELFVBQVUsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFD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QUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXBDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFN0QsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDOzs7O1lBakdKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSUNsYXNzaWZpY2F0aW9uVHJhaW5lciB9IGZyb20gJy4vY2xhc3NpZmljYXRpb24tdHJhaW5lci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgKiBhcyBuYXR1cmFsIGZyb20gJ25hdHVyYWwnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbGFzc2lmaWNhdGlvblRyYWluZXIgaW1wbGVtZW50cyBJQ2xhc3NpZmljYXRpb25UcmFpbmVyIHtcclxuICAgIHRyYWluQ2xhc3NpZmllcihjbGFzc2lmaWVyOiBuYXR1cmFsLkJheWVzQ2xhc3NpZmllcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCd1c2Uga2V5cycsICd1c2UnKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgndXNlIGtub2InLCAndXNlJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3VzZSBvbGQgcGVuJywgJ3VzZScpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCd1c2UgcnVzdHkga25pZmUnLCAndXNlJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ29wZW4gZG9vcicsICd1c2UnKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnb3BlbiBvdmVuJywgJ3VzZScpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdvcGVuIHdpbmRvdycsICd1c2UnKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnaW50ZXJhY3Qgd2l0aCBhbmltYWwnLCAndXNlJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2ludGVyYWN0IHBlcnNvbicsICd1c2UnKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnY2xvc2UgZG9vcicsICd1c2UnKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnY2xvc2UgY2hlc3QnLCAndXNlJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3NodXQgd2luZG93JywgJ3VzZScpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdzaHV0IHRoZSBsaWQnLCAndXNlJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2RyaW5rIHNvZGEnLCAndXNlJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2RyaW5rIHdhdGVyJywgJ3VzZScpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdlYXQgbXVzaHJvb21zJywgJ3VzZScpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdlYXQgZm9vZCcsICd1c2UnKTtcclxuXHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2xvb2sgYXQgaG91c2UnLCAnbG9va19hdCcpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdsb29rIGF0IHRoZSBjaGFpcicsICdsb29rX2F0Jyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2luc3BlY3QgZG9vcicsICdsb29rX2F0Jyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2luc3BlY3Qga25pZmUnLCAnbG9va19hdCcpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdjaGVjayB3aW5kb3cnLCAnbG9va19hdCcpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdjaGVjayBmaXJlcGxhY2UnLCAnbG9va19hdCcpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdhbmFseXplIG5vdGVzJywgJ2xvb2tfYXQnKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnYW5hbHl6ZSBrZXlzJywgJ2xvb2tfYXQnKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgncmVhZCBib29rJywgJ2xvb2tfYXQnKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgncmVhZCBsZXR0ZXInLCAnbG9va19hdCcpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdvYnNlcnZlIGRhcmtuZXNzJywgJ2xvb2tfYXQnKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnb2JzZXJ2ZSBmb3JyZXN0JywgJ2xvb2tfYXQnKTtcclxuXHJcblxyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdnbyBpbnNpZGUnLCAnZ29fdG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnZ28gb3V0c2lkZScsICdnb190bycpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdlbnRlciBidWlsZGluZycsICdnb190bycpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdlbnRlciBob21lJywgJ2dvX3RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2xlYXZlIGhvdXNlJywgJ2dvX3RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2xlYXZlIGh1dCcsICdnb190bycpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdydW4gYXdheScsICdnb190bycpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdydW4gaW50byB0aGUgZGFya25lc3MnLCAnZ29fdG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnd2FsayB0byBwbGFjZScsICdnb190bycpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCd3YWxrIHRvIHRoZSBzaGVkJywgJ2dvX3RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3dhbGsgaW50byB0aGUgYmFyJywgJ2dvX3RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2dvIHRvIFBldGVyJywgJ2dvX3RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2dvIGluIHRvIHRoZSBmb3JyZXN0JywgJ2dvX3RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2dvIGludG8gdGhlIGNlbGxhcicsICdnb190bycpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3Rha2Uga2V5cycsICdwaWNrX3VwJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3Rha2UgdXAgYm9vaycsICdwaWNrX3VwJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3Rha2Ugbm90ZWJvb2snLCAncGlja191cCcpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdwaWNrIHVwIGEgbGlnaHRlcicsICdwaWNrX3VwJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3BpY2sgdXAgbGVhc2gnLCAncGlja191cCcpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdwdXQgc29tZXRoaW5nIGludG8gYmFnJywgJ3BpY2tfdXAnKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgncHV0IHdhdGVyIGJvdHRsZSBpbnRvIGludmVudG9yeScsICdwaWNrX3VwJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2dhdGhlciBtdXNocm9vbXMnLCAncGlja191cCcpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdjb2xsZWN0IHN0b25lcycsICdwaWNrX3VwJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2FjcXVpcmUgbWVkYWwnLCAncGlja191cCcpO1xyXG5cclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnZGFuY2UnLCAnZG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnc2l0JywgJ2RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3N0YW5kJywgJ2RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3NsZWVwJywgJ2RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2Zpc2gnLCAnZG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnZG8nLCAnZG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnd3JpdGUnLCAnZG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgncmVhZCcsICdkbycpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdmaW5kJywgJ2RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3dvcmsnLCAnZG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgndHJ5JywgJ2RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2ZlZWwnLCAnZG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnY3JlYXRlJywgJ2RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3NwZWFrJywgJ2RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3RhbGsnLCAnZG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnb2ZmZXInLCAnZG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnYnV5JywgJ2RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2tpbGwnLCAnZG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnYmVhdCcsICdkbycpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdoYXJtJywgJ2RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ2p1bXAnLCAnZG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgnc2VsbCcsICdkbycpO1xyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmFkZERvY3VtZW50KCdwdWxsJywgJ2RvJyk7XHJcbiAgICAgICAgICAgIGNsYXNzaWZpZXIuYWRkRG9jdW1lbnQoJ3B1c2gnLCAnZG8nKTtcclxuICAgICAgICAgICAgY2xhc3NpZmllci5hZGREb2N1bWVudCgncHV0JywgJ2RvJyk7XHJcblxyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLmV2ZW50cy5vbigndHJhaW5lZFdpdGhEb2N1bWVudCcsICgpID0+IHJlc29sdmUoKSk7XHJcblxyXG4gICAgICAgICAgICBjbGFzc2lmaWVyLnRyYWluKCk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==