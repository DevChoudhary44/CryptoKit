// ConversationManager.js
// Lightweight in-memory conversation state.
// Never stores sensitive raw data — sanitize before storing.

import { BOT_CONFIG, LEARNING_LEVELS } from "./BotConfig.js";
import { generateId, cleanText } from "./CryptoBotUtils.js";
import { sanitizeMessage } from "./SecurityGuard.js";

const state = {
    messages: [],
    currentTopic: null,
    currentTier: BOT_CONFIG.defaultTier,
    learningLevel: BOT_CONFIG.defaultLearningLevel,
    activeChallenge: null
};

export function addMessage(role, content, meta = {}) {
    if (!role || !content) return null;

    const safeContent = sanitizeMessage(cleanText(String(content)));
    const message = {
        id: generateId("msg"),
        role,                     // "user" | "bot" | "system"
        content: safeContent,
        intent: meta.intent || null,
        tier: meta.tier || state.currentTier,
        timestamp: Date.now()
    };

    state.messages.push(message);

    // Enforce max history
    const limit = BOT_CONFIG.maxHistoryLength;
    if (state.messages.length > limit) {
        state.messages.splice(0, state.messages.length - limit);
    }

    return message;
}

export function getMessages() {
    return [...state.messages];
}

export function getLastMessage() {
    return state.messages[state.messages.length - 1] || null;
}

export function clearConversation() {
    state.messages = [];
    state.currentTopic = null;
    state.activeChallenge = null;
}

/**
 * Returns a compact context object for intent/knowledge modules.
 */
export function getConversationContext() {
    return {
        lastMessage: getLastMessage(),
        currentTopic: state.currentTopic,
        currentTier: state.currentTier,
        learningLevel: state.learningLevel,
        activeChallenge: state.activeChallenge,
        recent: state.messages.slice(-5)
    };
}

export function setCurrentTopic(topic) {
    state.currentTopic = topic || null;
}

export function getCurrentTopic() {
    return state.currentTopic;
}

export function setLearningLevel(level) {
    const valid = Object.values(LEARNING_LEVELS);
    if (!valid.includes(level)) {
        console.warn(`[ConversationManager] Invalid learning level: ${level}`);
        return false;
    }
    state.learningLevel = level;
    return true;
}

export function getLearningLevel() {
    return state.learningLevel;
}

export function setActiveChallenge(challengeSession) {
    state.activeChallenge = challengeSession || null;
}

export function getActiveChallenge() {
    return state.activeChallenge;
}

export function setCurrentTier(tier) {
    state.currentTier = tier;
}

export function getCurrentTier() {
    return state.currentTier;
}