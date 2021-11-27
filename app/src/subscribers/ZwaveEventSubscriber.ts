'use strict';

import {
    ControllerStatistics,
    FirmwareUpdateStatus,
    InclusionResult,
    NodeInterviewFailedEventArgs,
    ZWaveNode,
    ZWaveNodeMetadataUpdatedArgs,
    ZWaveNodeValueAddedArgs,
    ZWaveNodeValueNotificationArgs
} from 'zwave-js';
import {nodeEventService} from "../services/Zwave/NodeEventService";


class ZwaveEventSubscriber {

    /**
     * Controller events
     */
    initControllerEvents(controller) {

        controller.on('inclusion started', (secure, strategy) => {

        });

        controller.on('inclusion failed', () => {

        });

        controller.on('inclusion stopped', () => {

        });

        controller.on('exclusion started', () => {

        });

        controller.on('exclusion failed', () => {

        });

        controller.on('exclusion started', () => {

        });

        // A node has successfully been added to the network
        controller.on('node added', (node: ZWaveNode, result: InclusionResult) => {
            nodeEventService.nodeAdded(node);
        });

        // A node has successfully been replaced or removed from the network.
        controller.on('node removed', (node: ZWaveNode, replaced: boolean) => {

        });

        controller.on('heal network progress', (progress) => {

        });

        controller.on('heal network done', (result) => {

        });

        controller.on('statistics updated', (statistics: ControllerStatistics) => {

        });
    }

    /**
     * Node events
     */
    initNodeEvents(node: ZWaveNode) {

        // A sleeping node has woken up.
        node.on('wake up', (node: ZWaveNode) => {

        });

        // A node has gone back to sleep.
        node.on('sleep', (node: ZWaveNode) => {

        });

        // A non-sleeping node has stopped responding.
        node.on('dead', (node: ZWaveNode) => {

        });

        // A non-sleeping node started responding again.
        node.on('alive', (node: ZWaveNode) => {

        });

        // The initial interview or reinterview process for this node has started.
        node.on('interview started', (node: ZWaveNode) => {

        });

        // A state of the interview process for this node was completed. Only the name of the stage is provided and should not be relied on as stage names are subject to change:
        node.on('interview stage completed', (node: ZWaveNode, stageName: string) => {

        });

        // The initial interview or reinterview process for this node was completed.
        node.on('interview completed', (node: ZWaveNode) => {

        });

        // The interview process for this node or one of the interview attempts has failed. The second argument includes more detailed information, including a formatted error message that explains why and a flag to indicate whether this was the final attempt.
        node.on('interview failed', (node: ZWaveNode, args: NodeInterviewFailedEventArgs) => {

        });

        // This is emitted when enough information about the node is known that it can safely be used.
        node.on('ready', (node: ZWaveNode) => {
            nodeEventService.nodeReady(node);
        });

        // Firmware update progress has been made. The callback takes the node itself, the already sent fragments, and the total fragments to be sent:
        node.on('firmware update progress', (node: ZWaveNode, sentFragments: number, totalFragments: number) => {

        });

        // The firmware update process is finished. The returned status indicates whether the update was successful and if it was, a wait time may be needed before the device is functional again.
        node.on('firmware update finished', (node: ZWaveNode, status: FirmwareUpdateStatus, waitTime?: number) => {

        });
    }

    /**
     * Value event
     */
    initNodeValueEvents(node: ZWaveNode) {

        node.on('value added', (node: ZWaveNode, args: ZWaveNodeValueAddedArgs) => {
            nodeEventService.valueChanged(node, args);
        });

        node.on('value updated', (node: ZWaveNode, args: ZWaveNodeValueAddedArgs) => {
            nodeEventService.valueChanged(node, args);
        });

        node.on('value removed', (nnode: ZWaveNode, args) => {
            nodeEventService.valueRemoved(node, args);
            // Publisher.publishToQueue({event:'node_value_removed', nodeId:nodeId, nodeData:valueId});
        });

        // Some values (like Central Scene notifications) are stateless, meaning their value only has significance the moment it is received.
        node.on('value notification', (node: ZWaveNode, args: ZWaveNodeValueNotificationArgs) => {

        });

        // The dynamic metadata for one of this node's values was added or updated.
        node.on('metadata updated', (node: ZWaveNode, args: ZWaveNodeMetadataUpdatedArgs) => {

        });

        // node.on('notification', (args: ZWaveNotificationCallbackParams_NotificationCC | ZWaveNotificationCallbackParams_EntryControlCC | ZWaveNotificationCallbackParams_PowerlevelCC) => {

        // });
    }
}

export const zwaveEventSubscriber = new ZwaveEventSubscriber();