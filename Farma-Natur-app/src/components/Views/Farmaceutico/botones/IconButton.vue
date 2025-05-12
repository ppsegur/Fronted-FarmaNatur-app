<template>
  
    <label class="key key-hoverable" :class="buttonClass">
      <input type="checkbox" class="key-checkbox" />
      <div class="key-top">
        <svg class="key-icon" viewBox="0 0 24 24">
          <slot></slot>
        </svg>
      </div>
      <div class="key-tooltip" :class="tooltipClass">{{ tooltip }}</div>
    </label>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    tooltip: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'blue', // Valores posibles: 'blue', 'red', 'green'
    },
  });
  
  const buttonClass = computed(() => {
    return {
      'key-blue': props.color === 'blue',
      'key-red': props.color === 'red',
      'key-green': props.color === 'green',
    };
  });
  
  const dotClass = computed(() => {
    return {
      'wifi-dot': props.color === 'blue',
      'hotspot-dot': props.color === 'red',
      'network-dot': props.color === 'green',
    };
  });
  
  const tooltipClass = computed(() => {
    return {
      'wifi-tooltip': props.color === 'blue',
      'network-tooltip': props.color === 'green',
      'hotspot-tooltip': props.color === 'red',
    };
  });
  </script>
  
  <style scoped>
  .key {
    position: relative;
    width: 30px;
    height: 30px;
    perspective: 200px;
    cursor: pointer;
  }
  .key-checkbox {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  .key-top {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 0 #bdbdbd, 0 6px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    transform-style: preserve-3d;
    transform: translateZ(0);
    position: relative;
  }
  .key-hoverable:hover .key-top {
    transform: translateY(-2px) translateZ(10px);
    box-shadow: 0 6px 0 #bdbdbd, 0 8px 15px rgba(0, 0, 0, 0.15);
  }
  .key-checkbox:checked + .key-top {
    transform: translateY(4px) translateZ(0);
    box-shadow: 0 1px 0 #bdbdbd, 0 3px 5px rgba(0, 0, 0, 0.1);
  }
  .key-icon {
    width: 24px;
    height: 24px;
  }
  .status-dot {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .wifi-dot {
    background: #42a5f5;
  }
  .hotspot-dot {
    background: #ff7043;
  }
  .network-dot {
    background: #66bb6a;
  }
  .key-checkbox:checked + .key-top .status-dot {
    opacity: 1;
  }
  .key-tooltip {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    white-space: nowrap;
  }
  .wifi-tooltip {
    background: #55ca51f6;
    color: white;
  }
  .hotspot-tooltip {
    background: #ff7043;
    color: white;
  }
  .network-tooltip {
    background: #66bb6a;
    color: white;
  }
  .key-hoverable:hover .key-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  </style>