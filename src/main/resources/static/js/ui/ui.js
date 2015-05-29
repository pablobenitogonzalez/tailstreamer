/**
 * UI module
 */
'use strict';

var $ = require('jquery');

var socket = require('../socket');
require('./clock');
require('./lineCounter');
require('./unreadLineCount');
require('./connectionStatusIndicator');
require('./tooltips');
require('./hotkeys');
require('./messageHandler');
require('./search');

var $clearButton;
var $filterButton;
var $highlightButton;
var $jumpToBottomButton;
var $logContent;
var $searchText;
var $reconnectLink;
var $filenameContainer;

function initButtons() {
    $jumpToBottomButton.click(function(e) {
        $logContent.scrollTop($logContent[0].scrollHeight);
    });

    $logContent.on('scroll', function(e) {
        if ($logContent.scrollTop() + $logContent.innerHeight() !== $logContent[0].scrollHeight) {
            $jumpToBottomButton.fadeIn();
        } else {
            $jumpToBottomButton.fadeOut();
        }
    });
}

/**
 * Recalculates the proper size of the log content area.
 */
function sizeLogContentArea() {
    $logContent.height($(window).height() - 112);
}

/**
 * Tries to connect.
 */
function retryConnection() {
    socket.connect();
}

function bindEventListeners() {
    $(window).resize(sizeLogContentArea);
    $clearButton.click(clearLog);
    $reconnectLink.hide().click(retryConnection);
}

function clearLog(e) {
    e.preventDefault();
    $logContent.empty();
}

$(document).ready(function() {
    $clearButton = $('#clearButton');
    $filterButton = $('#filterButton');
    $highlightButton = $('#highlightButton');
    $logContent = $('#logContent');
    $jumpToBottomButton = $('#jumpToBottomButton');
    $searchText = $('#searchText');
    $reconnectLink = $('#reconnectLink');
    $filenameContainer = $('#filenameContainer');

    sizeLogContentArea();
    initButtons();
    bindEventListeners();
});
