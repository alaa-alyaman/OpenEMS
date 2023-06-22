package io.openems.edge.battery.dummy;

import io.openems.common.test.AbstractComponentConfig;
import io.openems.edge.common.startstop.StartStopConfig;

@SuppressWarnings("all")
public class MyConfig extends AbstractComponentConfig implements Config {

	public static class Builder {
		private String id;
		private StartStopConfig startStop;
		private int batteryStartStopTime;

		private Builder() {
		}

		public Builder setId(String id) {
			this.id = id;
			return this;
		}

		public Builder setStartStop(StartStopConfig startStop) {
			this.startStop = startStop;
			return this;
		}

		public Builder setBatteryStartStopTime(int batteryStartStopTime) {
			this.batteryStartStopTime = batteryStartStopTime;
			return this;
		}

		public MyConfig build() {
			return new MyConfig(this);
		}
	}

	/**
	 * Create a Config builder.
	 *
	 * @return a {@link Builder}
	 */
	public static Builder create() {
		return new Builder();
	}

	private final Builder builder;

	private MyConfig(Builder builder) {
		super(Config.class, builder.id);
		this.builder = builder;
	}

	@Override
	public StartStopConfig startStop() {
		return this.builder.startStop;
	}

	@Override
	public int batteryStartStopTime() {
		return this.builder.batteryStartStopTime;
	}
}